#!/bin/bash
DEPLOY_ENV=dev
ROOT="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )"

echo "Upload local states files to S3"
aws s3 cp "$ROOT/../../infra/terraform.tfstate" "s3://tomatodoro-$DEPLOY_ENV-infrastructure-bucket/terraform.tfstate" 
aws s3 cp "$ROOT/../../infra/terraform.tfstate.backup" "s3://tomatodoro-$DEPLOY_ENV-infrastructure-bucket/terraform.tfstate.backup" 

echo "Remove local states files"
rm -rf "$ROOT/../../infra/terraform.tfstate"
rm -rf "$ROOT/../../infra/terraform.tfstate.backup"