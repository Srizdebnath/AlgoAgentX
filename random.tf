resource "random_password" "db_password" {
      count            = var.db_password == null ? 1 : 0
      length           = 24
      special          = true
      override_special = "!#$%&*()-_=+[]{}<>:?"
    }
    resource "random_pet" "db_username" {
      count     = var.db_username == null ? 1 : 0
      length    = 2
      separator = "_"
    }
    locals {
      db_username = var.db_username != null ? var.db_username : random_pet.db_username[0].id
      db_password = var.db_password != null ? var.db_password : random_password.db_password[0].result
    }
    