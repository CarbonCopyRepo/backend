# This configuration creates a kubernetes cluster on GCP
# named "primary" and the autopilot mode ensures that
# GCP manages all the underlying GKE infrastructure.
resource "google_container_cluster" "primary" {
  name               = "cc-backend-primary"
  location           = "us-west1"

  enable_autopilot = true

  master_auth {
    client_certificate_config {
      issue_client_certificate = false
    }
  }

  release_channel {
    channel = "REGULAR"
  }

}

provider "kubernetes" {
  host  = "https://${google_container_cluster.primary.endpoint}"
  token = data.google_client_config.default.access_token

  client_certificate     = base64decode(google_container_cluster.primary.master_auth[0].client_certificate)
  client_key             = base64decode(google_container_cluster.primary.master_auth[0].client_key)
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

data "google_client_config" "default" {}
