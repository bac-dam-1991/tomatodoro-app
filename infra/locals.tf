locals {
  owner             = "BTD Tech Pty Ltd"
  modified_app_name = "${var.app_name}-${var.deploy_env}"

  tags = {
    APP        = var.app_name
    OWNER      = local.owner
    VERSION    = var.app_version
    DEPLOY_ENV = var.deploy_env
    NODE_ENV   = var.node_env
  }

  scriptSrc = [
    "'self'",
    "'unsafe-inline'"
  ]

  frameSrc = []

  styleSrc = [
    "'self'",
    "'unsafe-inline'"
  ]

  imgSrc = [
    "'self'"
  ]

  connectSrc = [
    "'self'",
  ]

  csp = [
    "script-src ${join(" ", local.scriptSrc)}",
    "frame-src ${join(" ", local.frameSrc)}",
    "style-src ${join(" ", local.styleSrc)}",
    "img-src ${join(" ", local.imgSrc)}",
    "connect-src ${join(" ", local.connectSrc)}"
  ]
}
