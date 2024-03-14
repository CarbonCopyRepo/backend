# Create a kubernetes deployment
resource "kubernetes_deployment" "cc-backend" {
  metadata {
    name = "cc-backend-deploy"
  }

  spec {
    replicas = 3

    # Which pods should be matched
    selector {
      match_labels = {
        App = "cc-backend"
      }
    }

    # Labels to apply to the pods
    template {
      metadata {
        labels = {
          App = "cc-backend"
        }
      }

      # gcr.io/${{ secrets.GCP_PROJECT_ID }}/$IMAGE_NAME
      spec {
        container {
          image = "${var.artifact_registry}/${var.project_id}/${var.image_name}:${var.tag}"
          name  = "cc-backend"

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}