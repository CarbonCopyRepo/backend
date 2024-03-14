# Declare the required variables that can be
# used in all of our .tf files
variable "project_id" {}
variable "artifact_registry" {}
variable "image_name" {}
variable "tag" {}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs
# Configure a cloud provider that terraform will use (in our case GCP)
provider "google" {
  project = var.project_id
  region  = "us-west1"
}

# https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket
# Provision a storage bucket in GCP to store our terraform state remotely in GCP
terraform {
  backend "gcs" {
    bucket = "carboncopy-tf-state-staging"
    prefix = "terraform/state"
  }
  # Specify minimum version of the tf provider to use
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}
