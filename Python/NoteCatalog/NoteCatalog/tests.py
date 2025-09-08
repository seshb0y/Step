from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Note, Tag


class NoteModelTest(TestCase):
    def setUp(self):
        self.tag = Tag.objects.create(name='Test Tag', slug='test-tag')
        self.note = Note.objects.create(
            title='Test Note',
            body='This is a test note body'
        )
        self.note.tags.add(self.tag)

    def test_note_creation(self):
        """Тест создания заметки"""
        self.assertEqual(self.note.title, 'Test Note')
        self.assertEqual(self.note.body, 'This is a test note body')
        self.assertIsNotNone(self.note.created_at)
        self.assertIsNotNone(self.note.updated_at)

    def test_note_str(self):
        """Тест строкового представления заметки"""
        self.assertEqual(str(self.note), 'Test Note')

    def test_note_ordering(self):
        """Тест упорядочивания заметок"""
        note2 = Note.objects.create(title='Second Note', body='Second body')
        notes = Note.objects.all()
        self.assertEqual(notes[0], note2)  # Новые заметки должны быть первыми


class NoteViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.tag = Tag.objects.create(name='Test Tag', slug='test-tag')
        self.note = Note.objects.create(
            title='Test Note',
            body='This is a test note body'
        )
        self.note.tags.add(self.tag)

    def test_note_list_view(self):
        """Тест отображения списка заметок"""
        response = self.client.get(reverse('note_list'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Note')
        self.assertTemplateUsed(response, 'notes/note_list.html')

    def test_note_detail_view(self):
        """Тест отображения детальной страницы заметки"""
        response = self.client.get(reverse('note_detail', kwargs={'pk': self.note.pk}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Note')
        self.assertTemplateUsed(response, 'notes/note_detail.html')

    def test_note_search_view(self):
        """Тест поиска заметок"""
        response = self.client.get(reverse('note_search'), {'q': 'Test'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test')  # Ищем часть текста, так как он может быть подсвечен

    def test_note_create_requires_login(self):
        """Тест что создание заметки требует авторизации"""
        response = self.client.get(reverse('note_create'))
        self.assertEqual(response.status_code, 302)  # Редирект на логин

    def test_note_create_authenticated(self):
        """Тест создания заметки авторизованным пользователем"""
        self.client.login(username='testuser', password='testpass123')
        response = self.client.get(reverse('note_create'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'notes/note_form.html')

    def test_tag_notes_view(self):
        """Тест отображения заметок по тегу"""
        response = self.client.get(reverse('tag_notes', kwargs={'slug': 'test-tag'}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Test Note')
        self.assertTemplateUsed(response, 'notes/note_list.html')
