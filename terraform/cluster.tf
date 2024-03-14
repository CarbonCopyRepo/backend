# Configure the control plane of the cluster
resource "google_container_cluster" "primary" {
  name               = "primary"
  location           = "us-west1-a"
  initial_node_count = 3

  # The below two can cost a lot, so use caution
  # logging_service = "logging.googleapis.com/kubernetes"
  # monitoring_service = "monitoring.googleapis.com/kubernetes"

  # Multi-zonal cluster
  node_locations = [
    "us-west1-b"
  ]

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  node_config {
    preemptible     = false
    machine_type    = "e2-small"
    service_account = google_service_account.kube-cluster.email

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  release_channel {
    channel = "REGULAR"
  }
}

# Configure the kubernetes provider
provider "kubernetes" {
  host  = google_container_cluster.primary.endpoint
  token = data.google_client_config.default.access_token

  load_config_file = false

  client_certificate     = base64decode(google_container_cluster.primary.master_auth[0].client_certificate)
  client_key             = base64decode(google_container_cluster.primary.master_auth[0].client_key)
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

data "google_client_config" "default" {}