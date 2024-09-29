from rest_framework import viewsets
from rest_framework import mixins

from core.models import Document
from core.serializers import DocumentSerialier

# Create your views here.
class DocumentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    """
    Endpoint for the Document resource.

    ---

    ## GET /document/

    GET list of documents

    ---

    ## GET /document/*id*/

    GET document details

    ---
    """

    queryset = Document.objects.all()
    serializer_class = DocumentSerialier


    def get_queryset(self):
        if self.request.user.is_superuser:
            return super().get_queryset()
        return Document.objects.filter(user=self.request.user.pk)
