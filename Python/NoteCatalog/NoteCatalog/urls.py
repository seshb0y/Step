from django.urls import path
from . import views

urlpatterns = [
    path("", views.NoteListView.as_view(), name="note_list"),
    path("notes/<int:pk>/", views.NoteDetailView.as_view(), name="note_detail"),
    path("notes/create/", views.NoteCreateView.as_view(), name="note_create"),
    path("notes/<int:pk>/edit/", views.NoteUpdateView.as_view(), name="note_update"),
    path("notes/<int:pk>/delete/", views.NoteDeleteView.as_view(), name="note_delete"),
    path("tags/<slug:slug>/", views.TagNoteListView.as_view(), name="tag_notes"),
    path("search/", views.NoteSearchView.as_view(), name="note_search"),
]