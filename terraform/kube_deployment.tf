# This file specifies what should be run on the GKE
# cluster - the docker image, the # of replicas etc.
resource "kubernetes_deployment" "cc-backend" {
  metadata {
    name = "cc-backend-deploy"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        App = "cc-backend"
      }
    }

    template {
      metadata {
        labels = {
          App = "cc-backend"
        }
      }

      spec {
        container {
          image = "${var.artifact_registry}/${var.project_id}/${var.image_name}:${var.tag}"
          name  = "cc-backend"

          env {
            name = "GEOCODE_API_KEY"
            value = var.geocode_api_key
          }

          env {
            name = "HERE_API_KEY"
            value = var.here_api_key
          }

          env {
            name = "CONNECTION_NAME"
            value = var.connection_name
          }

          env {
            name = "DB_NAME"
            value = var.db_name
          }

          env {
            name = "DB_USER"
            value = var.db_user
          }

          env {
            name = "DB_PASSWORD"
            value = var.db_password
          }

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}