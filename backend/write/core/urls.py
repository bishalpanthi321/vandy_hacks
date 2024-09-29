from rest_framework import routers

from . import views

app_name = "core"

router = routers.DefaultRouter()

router.register("document", views.DocumentViewSet, basename="document")
