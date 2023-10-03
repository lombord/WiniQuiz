from rest_framework import permissions


class isNotAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        return not request.user.is_authenticated
