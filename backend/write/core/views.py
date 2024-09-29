from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.response import Response

from core.models import Document
from core.serializers import DocumentSerialier
from core.suggestion import suggest

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

    
    @action(detail=True, methods=["get"])
    def suggest(self, request, pk=None):
        document = Document.objects.get(pk=pk)
        return Response(suggest(document.data))
