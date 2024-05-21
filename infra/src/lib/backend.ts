import { S3Backend } from "cdktf"
import { Construct } from "constructs"

import { AWS_REGION, CDKTF_BACKEND_BUCKET } from "../util"

export const configureS3Backend = (scope: Construct): S3Backend => {
  return new S3Backend(scope, {
    bucket: CDKTF_BACKEND_BUCKET,
    key: `tfstate/${scope.node.id}.tfstate`,
    region: AWS_REGION,
    acl: "bucket-owner-full-control"
  })
}
