from django.urls import path

from . import views

app_name = "news"


urlpatterns = [
    path("", views.ArticleListView.as_view(), name="article_list"),
    path("article/create/", views.ArticleCreateView.as_view(), name="article_create"),
    path("article/<slug:slug>/", views.ArticleDetailView.as_view(), name="article_detail"),
    path(
        "article/<slug:slug>/edit/",
        views.ArticleUpdateView.as_view(),
        name="article_update",
    ),
    path(
        "article/<slug:slug>/delete/",
        views.ArticleDeleteView.as_view(),
        name="article_delete",
    ),
    path("article/<slug:slug>/rate/", views.rate_article, name="rate_article"),
    path(
        "article/<slug:slug>/bookmark-toggle/",
        views.toggle_bookmark,
        name="bookmark_toggle",
    ),
    path("popular/", views.PopularArticleListView.as_view(), name="popular_list"),
    path("categories/", views.CategoryListView.as_view(), name="category_list"),
    path(
        "category/<slug:slug>/",
        views.CategoryDetailView.as_view(),
        name="category_detail",
    ),
    path("authors/", views.AuthorListView.as_view(), name="author_list"),
    path(
        "author/<str:username>/",
        views.AuthorDetailView.as_view(),
        name="author_detail",
    ),
    path("favorites/", views.FavoriteListView.as_view(), name="favorites"),
    path("signup/", views.SignUpView.as_view(), name="signup"),
]
