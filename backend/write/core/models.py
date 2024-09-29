from django.db import models
from django.contrib.sites.models import Site
from django.utils.translation import gettext_lazy as _

from django.conf import settings

class SiteSettings(Site):
    class Meta:
        verbose_name = _("site settings")
        verbose_name_plural = _("site settings")

class Document(models.Model):
    filename = models.CharField(max_length=255)
    data = models.TextField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="document",
        blank=True,
        verbose_name="user",
    )


    def __str__(self):
        return f"{self.filename} from {self.user}"
