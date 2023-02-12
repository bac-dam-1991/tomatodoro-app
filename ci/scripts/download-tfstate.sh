#!/bin/bash
DEPLOY_ENV=dev
ROOT="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )"

echo "Download remote states files"
aws s3 cp "s3://tomatodoro-$DEPLOY_ENV-infrastructure-bucket/terraform.tfstate" "$ROOT/../../infra/terraform.tfstate"
aws s3 cp "s3://tomatodoro-$DEPLOY_ENV-infrastructure-bucket/terraform.tfstate.backup" "$ROOT/../../infra/terraform.tfstate.backup"