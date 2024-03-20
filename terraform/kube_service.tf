# This file exposes the backend as a service to
# be accessible to the outside world
resource "kubernetes_service" "cc-backend" {
  metadata {
    name = "cc-backend"
  }

  spec {
    selector = {
      App = "cc-backend"
    }

    type = "LoadBalancer"

    port {
      port = 3000 # External traffic comes in on this port
      target_port = 3000 # Traffic to the pods is routed on this port
    }
  }
}