variable "app_name" {
  type    = string
  default = "tomatodoro"
}

variable "deploy_env" {
  type = string
}

variable "node_env" {
  type    = string
  default = "production"
}

variable "app_version" {
  type    = string
  default = "1.0.0"
}

variable "domains" {
  type = list(string)
}

variable "aws_profile" {
  type    = string
  default = "default"
}
