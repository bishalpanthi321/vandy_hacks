from django.contrib import admin

from core.models import Document
from django.contrib.auth import get_user_model

# Register your models here.
admin.site.register(Document)
admin.site.register(get_user_model())
