module "base_infra" {
  source                 = "./modules/base-infra"
  aws_profile            = var.aws_profile
  base_infra_bucket_name = "${local.modified_app_name}-infrastructure-bucket"
}

module "app_bucket" {
  source        = "git@github.com:btd-tech/tf-module-s3.git"
  app_name      = local.modified_app_name
  tags          = local.tags
  domains       = var.domains
  dist_dir_path = "${path.module}/dist/web"
  aws_profile   = var.aws_profile
  csp           = join("; ", local.csp)
}
