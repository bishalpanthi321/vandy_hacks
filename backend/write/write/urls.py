"""knits_and_stitches_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin

from .router import MainRouter
from authentication.urls import router as authentication_router
from core.urls import router as core_router


router = MainRouter()
router.registry.extend(authentication_router.registry)
router.registry.extend(core_router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include((router.urls, "api"))),
]
