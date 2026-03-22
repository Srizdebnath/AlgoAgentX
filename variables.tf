variable "region" {
      description = "AWS region"
      type        = string
      default     = "us-east-1"
    }

    variable "project_name" {
      description = "Project name"
      type        = string
      default     = "AlgoAgentX"
    }

    variable "environment" {
      description = "Environment"
      type        = string
      default     = "dev"
    }

    variable "vpc_id" {
      description = "VPC ID"
      type        = string
      default     = "vpc-placeholder"
    }

    variable "public_subnet_ids" {
      description = "Public subnet IDs"
      type        = list(string)
      default     = ["subnet-public-1", "subnet-public-2"]
    }

    variable "private_subnet_ids" {
      description = "Private subnet IDs"
      type        = list(string)
      default     = ["subnet-private-1", "subnet-private-2"]
    }

    variable "db_username" {
      description = "Database username"
      type        = string
      sensitive   = true
      default     = null
    }

    variable "db_password" {
      description = "Database password (auto-generated if not provided)"
      type        = string
      sensitive   = true
      default     = null
    }
    