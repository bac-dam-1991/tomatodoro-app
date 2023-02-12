terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region  = "ap-southeast-2"
  alias   = "main_region"
  profile = var.aws_profile
}

provider "aws" {
  region  = "us-east-1"
  alias   = "us_east_1_region"
  profile = var.aws_profile
}
