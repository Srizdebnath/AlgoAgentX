variable "project_id" {
      description = "GCP project ID"
      type        = string
    }

    variable "region" {
      description = "GCP region"
      type        = string
      default     = "us-central1"
    }

    variable "project_name" {
      description = "Application name"
      type        = string
      default     = "AlgoAgentX"
    }

    variable "environment" {
      description = "Environment (dev/staging/prod)"
      type        = string
      default     = "dev"
    }

    variable "db_password" {
      description = "Database password (auto-generated if not provided)"
      type        = string
      sensitive   = true
      default     = null
    }
    