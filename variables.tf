variable "location" {
      description = "Azure region"
      type        = string
      default     = "East US"
    }

    variable "resource_group_name" {
      description = "Azure Resource Group"
      type        = string
      default     = "AlgoAgentX-rg"
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
    