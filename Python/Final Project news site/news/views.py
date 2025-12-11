from django.contrib.auth import get_user_model, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied
from django.db.models import Avg
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.views.decorators.http import require_POST
from django.views.generic import CreateView, DeleteView, DetailView, ListView, UpdateView

from .forms import ArticleForm
from .models import Article, ArticleRating, Bookmark, Category


User = get_user_model()


class NotBannedRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        user = request.user
        if user.is_authenticated:
            profile = getattr(user, "profile", None)
            if profile and profile.is_banned:
                raise PermissionDenied("Пользователь заблокирован")
        return super().dispatch(request, *args, **kwargs)


class ArticleListView(ListView):
    model = Article
    template_name = "news/article_list.html"
    context_object_name = "articles"
    paginate_by = 10

    def get_queryset(self):  # pragma: no cover - простая выборка
        return (
            Article.objects.filter(status=Article.STATUS_PUBLISHED)
            .select_related("author", "category")
            .prefetch_related("ratings")
        )


class ArticleDetailView(DetailView):
    model = Article
    template_name = "news/article_detail.html"
    context_object_name = "article"

    def get_queryset(self):  # pragma: no cover
        return Article.objects.filter(status=Article.STATUS_PUBLISHED).select_related(
            "author", "category"
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        article = self.object
        if user.is_authenticated:
            context["user_rating"] = ArticleRating.objects.filter(
                article=article, user=user
            ).first()
            context["is_bookmarked"] = Bookmark.objects.filter(
                article=article, user=user
            ).exists()
        return context


class ArticleCreateView(LoginRequiredMixin, NotBannedRequiredMixin, CreateView):
    model = Article
    form_class = ArticleForm
    template_name = "news/article_form.html"

    def form_valid(self, form):
        form.instance.author = self.request.user
        if self.request.user.is_staff:
            form.instance.status = Article.STATUS_PUBLISHED
        else:
            form.instance.status = Article.STATUS_PENDING
        return super().form_valid(form)

    def get_success_url(self):
        # Вариант A: админ/редактор видит детальную, обычный юзер — уходит на список
        if self.request.user.is_staff:
            return self.object.get_absolute_url()
        return reverse_lazy("news:article_list")


class ArticleAuthorOrStaffRequiredMixin(UserPassesTestMixin):
    def test_func(self):
        article = self.get_object()
        user = self.request.user
        return user.is_staff or article.author == user


class ArticleUpdateView(
    LoginRequiredMixin, NotBannedRequiredMixin, ArticleAuthorOrStaffRequiredMixin, UpdateView
):
    model = Article
    form_class = ArticleForm
    template_name = "news/article_form.html"

    def form_valid(self, form):
        if not self.request.user.is_staff:
            form.instance.status = Article.STATUS_PENDING
        return super().form_valid(form)


class ArticleDeleteView(
    LoginRequiredMixin, NotBannedRequiredMixin, ArticleAuthorOrStaffRequiredMixin, DeleteView
):
    model = Article
    template_name = "news/article_confirm_delete.html"
    success_url = reverse_lazy("news:article_list")


class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = "registration/signup.html"
    success_url = reverse_lazy("login")


class PopularArticleListView(ListView):
    model = Article
    template_name = "news/popular_list.html"
    context_object_name = "articles"

    def get_queryset(self):
        return (
            Article.objects.filter(status=Article.STATUS_PUBLISHED)
            .annotate(avg_rating=Avg("ratings__value"))
            .filter(avg_rating__gte=4)
            .select_related("author", "category")
            .order_by("-avg_rating", "-created_at")
        )


class CategoryListView(ListView):
    model = Category
    template_name = "news/category_list.html"
    context_object_name = "categories"


class CategoryDetailView(DetailView):
    model = Category
    template_name = "news/category_detail.html"
    context_object_name = "category"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["articles"] = (
            Article.objects.filter(category=self.object, status=Article.STATUS_PUBLISHED)
            .select_related("author", "category")
            .prefetch_related("ratings")
        )
        return context


class AuthorListView(ListView):
    model = User
    template_name = "news/author_list.html"
    context_object_name = "authors"

    def get_queryset(self):
        return (
            User.objects.filter(articles__status=Article.STATUS_PUBLISHED)
            .distinct()
            .order_by("username")
        )


class AuthorDetailView(DetailView):
    model = User
    template_name = "news/author_detail.html"
    context_object_name = "author"
    slug_field = "username"
    slug_url_kwarg = "username"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["articles"] = (
            Article.objects.filter(author=self.object, status=Article.STATUS_PUBLISHED)
            .select_related("category")
            .prefetch_related("ratings")
        )
        return context


class FavoriteListView(LoginRequiredMixin, NotBannedRequiredMixin, ListView):
    model = Bookmark
    template_name = "news/favorites.html"
    context_object_name = "bookmarks"

    def get_queryset(self):
        return (
            Bookmark.objects.filter(user=self.request.user)
            .select_related("article", "article__category")
            .order_by("-created_at")
        )


def logout_view(request):
    logout(request)
    return redirect("news:article_list")


def _user_is_banned(user) -> bool:
    profile = getattr(user, "profile", None)
    return bool(profile and profile.is_banned)


@login_required
@require_POST
def rate_article(request, slug):
    article = get_object_or_404(Article, slug=slug, status=Article.STATUS_PUBLISHED)
    if _user_is_banned(request.user):
        raise PermissionDenied("Пользователь заблокирован")
    action = request.POST.get("action")
    if action == "like":
        value = 5
    elif action == "dislike":
        value = 1
    else:
        return redirect(article.get_absolute_url())
    ArticleRating.objects.update_or_create(
        article=article, user=request.user, defaults={"value": value}
    )
    return redirect(article.get_absolute_url())


@login_required
@require_POST
def toggle_bookmark(request, slug):
    article = get_object_or_404(Article, slug=slug, status=Article.STATUS_PUBLISHED)
    if _user_is_banned(request.user):
        raise PermissionDenied("Пользователь заблокирован")
    bookmark, created = Bookmark.objects.get_or_create(
        article=article, user=request.user
    )
    if not created:
        bookmark.delete()
    return redirect(article.get_absolute_url())
