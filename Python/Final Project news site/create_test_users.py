import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model  # noqa: E402
from news.models import Profile  # noqa: E402


User = get_user_model()


def ensure_user(username, password, is_staff=False, is_superuser=False, is_banned=False):
    user, created = User.objects.get_or_create(
        username=username,
        defaults={"is_staff": is_staff, "is_superuser": is_superuser},
    )
    if not created:
        changed = False
        if user.is_staff != is_staff:
            user.is_staff = is_staff
            changed = True
        if user.is_superuser != is_superuser:
            user.is_superuser = is_superuser
            changed = True
        if changed:
            user.save()
    user.set_password(password)
    user.save()

    profile, _ = Profile.objects.get_or_create(user=user)
    if profile.is_banned != is_banned:
        profile.is_banned = is_banned
        profile.save()

    print(f"User {username} ready (staff={user.is_staff}, superuser={user.is_superuser}, banned={is_banned})")


ensure_user("superadmin", "SuperPass123!", is_staff=True, is_superuser=True, is_banned=False)
ensure_user("editor", "EditorPass123!", is_staff=True, is_superuser=False, is_banned=False)
ensure_user("banned", "BannedPass123!", is_staff=False, is_superuser=False, is_banned=True)

print("done")
