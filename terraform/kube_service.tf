resource "kubernetes_service" "cc-backend" {
  metadata {
    name = "cc-backend-service"
  }

  spec {
    selector = {
      App = "cc-backend"
    }

    # INFO: For sticky sessions, if app is stateless can be removed
    session_affinity = "ClientIP"

    port {
      port = 3000 # External traffic comes in on this port
      target_port = 3000 # Traffic to the pods is routed on this port
    }
  }
}