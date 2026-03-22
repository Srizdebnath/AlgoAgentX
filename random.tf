resource "azurerm_resource_group" "main" {
      name     = var.resource_group_name
      location = var.location
      tags = {
        Project     = var.project_name
        Environment = var.environment
        ManagedBy   = "terraform"
        CreatedBy   = "infoundry"
      }
    }

    resource "random_password" "db_password" {
      count            = var.db_password == null ? 1 : 0
      length           = 24
      special          = true
      override_special = "!#$%&*()-_=+[]{}<>:?"
    }
    locals {
      db_password = var.db_password != null ? var.db_password : random_password.db_password[0].result
    }
    