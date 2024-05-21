import { AwsProvider } from "@cdktf/provider-aws/lib/provider"
import { Construct } from "constructs"

import { AWS_REGION } from "../util"

export const configureAwsProvider = (scope: Construct): AwsProvider => {
  return new AwsProvider(scope, "aws", {
    region: AWS_REGION
  })
}
