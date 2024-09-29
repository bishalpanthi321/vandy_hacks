from rest_framework import serializers
from core.models import Document

class DocumentSerialier(serializers.ModelSerializer):
    class Meta:
        model = Document
        exclude = ("user", )

    def create(self, validated_data):
        request = self.context["request"]
        document_details = validated_data.pop("customer", None)

        if request.user.is_authenticated:
            document = Document.objects.create(**document_details, user=request.user.pk)
            document.save()
            return document

    def update(self, document, validated_data):
        data = validated_data["data"]
        document.data = data
        document.save()
        return document
