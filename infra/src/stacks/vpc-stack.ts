import { TerraformStack } from "cdktf"
import { Construct } from "constructs"

import { configureAwsProvider, createVPC } from "../lib"
import { ENV, SERVICE } from "../util"

export class VpcStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    configureAwsProvider(this)

    const tags = {
      env: ENV,
      service: SERVICE
    }

    const vpcConfig = {
      cidrBlock: "10.0.0.0/16",
      publicSubnetCidrBlocks: ["10.0.0.0/24"],
      privateSubnetCidrBlocks: ["10.0.10.0/24"],
      tags: tags
    }

    createVPC(this, "chainlit", vpcConfig)
  }
}
