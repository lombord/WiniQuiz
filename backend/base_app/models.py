import os
from uuid import uuid4
from django.db import models
from django.db.models.functions import Rank
from django.db.models.expressions import Window
from django.contrib.auth.models import AbstractUser, UserManager
from django.db.models.query import QuerySet
from django.urls import reverse


class UserQuerySet(models.QuerySet):
    d_order = '-score', '-correct', 'incorrect'

    def get_users(self):
        """Returns all none admin users
        Returns:
            UserQuerySet: queryset of users
        """
        return self.filter(is_superuser=False, is_active=True)

    def sorted_users(self, ordering=None):
        """Get users sorted by their order
        Args:
            ordering (iterable): additional ordering. Defaults to cls.d_order.
        Returns:
            UserQuerySet: users queryset
        """
        return self.get_users() \
            .annotate(rank=Window(
                expression=Rank(),
                order_by=(ordering or self.d_order),
            ))


class MyUserManager(UserManager):
    def get_queryset(self) -> UserQuerySet:
        return UserQuerySet(self.model, using=self._db)

    def sorted_users(self):
        return self.get_queryset().sorted_users()


def photo_path(user: 'User', fname: str):
    """Generates a path to a photo based on the user
    Args:
        user (User): instance of User model
        fname (str): The filename that was originally given to the file
    Returns:
        str: generated path
    """
    ext = os.path.splitext(fname)[-1]
    return f'user/{user.username}/profile/{uuid4()}{ext}'


class User(AbstractUser):
    score = models.PositiveIntegerField(default=0)
    correct = models.PositiveIntegerField(default=0)
    incorrect = models.PositiveIntegerField(default=0)
    photo = models.ImageField(upload_to=photo_path,
                              max_length=255,
                              default='defaults/user/default.png')

    objects: MyUserManager = MyUserManager()

    def get_absolute_url(self):
        return reverse("user", kwargs={"slug": self.username})
