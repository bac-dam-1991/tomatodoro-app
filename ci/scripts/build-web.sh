#!/bin/bash

ROOT=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$ROOT/../../client"

yarn build