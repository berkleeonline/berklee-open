#!/bin/bash


dev_user_pool="us-east-1_vxgco9D2z"


aws cognito-idp admin-create-user \
    --user-pool-id $dev_user_pool \
    --username $1 \
    --user-attributes \
        Name=email,Value="$2" \
        Name=email_verified,Value="true"
