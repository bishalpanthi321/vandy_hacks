from rest_framework import routers


class MainAPIRootView(routers.APIRootView):
    """
    ---

    ## Authentication

    See the `/token` endpoint for more details on authentication.

    ---

    ### Authentication and Authorization failures

    - `401 - Unauthorized` is returned for authentication failure.
    - `403 - Forbidden` is returned for authorization failure.

    ---
    """

    def get_view_name(self):
        return f"Write API"


class MainRouter(routers.DefaultRouter):
    APIRootView = MainAPIRootView

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.trailing_slash = "/?"
