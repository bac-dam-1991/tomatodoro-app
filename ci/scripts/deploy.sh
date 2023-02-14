#!/bin/sh

ROOT="$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )"
DEPLOY_ENV=dev

echo "Building web"
$ROOT/build-web.sh

echo "Make dist folders"
rm -rf "$ROOT/../../infra/dist"
mkdir -p "$ROOT/../../infra/dist/web"

echo "Copying files to dist directory"
mv $ROOT/../../client/dist/* $ROOT/../../infra/dist/web

echo "Download TF states"
$ROOT/download-tfstate.sh

cd $ROOT/../../infra

echo "Initialise Terraform"
terraform init -upgrade

echo "Deploy infrastructure"
terraform apply \
  -auto-approve \
  -var=deploy_env=$DEPLOY_ENV \
  -var-file="./tfvars/$DEPLOY_ENV.tfvars" \

echo "Upload TF states"
$ROOT/upload-tfstate.sh