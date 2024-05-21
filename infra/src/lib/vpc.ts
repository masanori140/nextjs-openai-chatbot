import { DataAwsAvailabilityZones } from "@cdktf/provider-aws/lib/data-aws-availability-zones"
import { Eip } from "@cdktf/provider-aws/lib/eip"
import { InternetGateway } from "@cdktf/provider-aws/lib/internet-gateway"
import { NatGateway } from "@cdktf/provider-aws/lib/nat-gateway"
import { RouteTable } from "@cdktf/provider-aws/lib/route-table"
import { RouteTableAssociation } from "@cdktf/provider-aws/lib/route-table-association"
import { Subnet } from "@cdktf/provider-aws/lib/subnet"
import { Vpc } from "@cdktf/provider-aws/lib/vpc"
import { Fn } from "cdktf"
import { Construct } from "constructs"

import { Tags } from "../types"

interface vpcConfig {
  readonly cidrBlock: string
  readonly publicSubnetCidrBlocks: string[]
  readonly privateSubnetCidrBlocks: string[]
  readonly tags: Tags
}

export const createVPC = (
  scope: Construct,
  statementPrefix: string,
  config: vpcConfig
): { vpcId: string; publicSubnetIds: string[]; privateSubnetIds: string[] } => {
  const availabilityZones = new DataAwsAvailabilityZones(scope, "availabilityZones", {
    state: "available"
  })

  const vpc = new Vpc(scope, `${statementPrefix}-vpc`, {
    cidrBlock: config.cidrBlock,
    enableDnsSupport: true,
    enableDnsHostnames: true,
    tags: {
      Name: `${config.tags.service}-${config.tags.env}-vpc`,
      ...config.tags
    }
  })

  const internetGateway = new InternetGateway(scope, `${statementPrefix}-internet-gateway`, {
    tags: {
      Name: `${config.tags.service}-${config.tags.env}-igw`,
      ...config.tags
    },
    vpcId: vpc.id
  })

  const publicRouteTable = new RouteTable(scope, `${statementPrefix}-public-route-table`, {
    route: [
      {
        cidrBlock: "0.0.0.0/0",
        gatewayId: internetGateway.id
      }
    ],
    tags: {
      Name: `${config.tags.service}-${config.tags.env}-public-route-table`,
      ...config.tags
    },
    vpcId: vpc.id
  })

  const publicSubnetIds = config.publicSubnetCidrBlocks.map((cidr: string, index: number) => {
    const subnet = new Subnet(scope, `${statementPrefix}-public-subnet-${index}`, {
      vpcId: vpc.id,
      cidrBlock: cidr,
      availabilityZone: Fn.element(availabilityZones.names, index),
      mapPublicIpOnLaunch: true,
      tags: {
        Name: `${config.tags.service}-${config.tags.env}-public-subnet-${Fn.element(availabilityZones.names, index)}`,
        ...config.tags
      }
    })

    new RouteTableAssociation(scope, `${statementPrefix}-public-route-table-association-${index}`, {
      routeTableId: publicRouteTable.id,
      subnetId: subnet.id
    })

    return subnet.id
  })

  const privateSubnetIds = config.privateSubnetCidrBlocks.map((cidr: string, index: number) => {
    const subnet = new Subnet(scope, `${statementPrefix}-private-subnet-${index}`, {
      vpcId: vpc.id,
      cidrBlock: cidr,
      availabilityZone: Fn.element(availabilityZones.names, index),
      mapPublicIpOnLaunch: true,
      tags: {
        Name: `${config.tags.service}-${config.tags.env}-private-subnet-${Fn.element(availabilityZones.names, index)}`,
        ...config.tags
      }
    })

    const eip = new Eip(scope, `${statementPrefix}-eip-${index}`, {
      domain: "vpc",
      tags: {
        Name: `${config.tags.service}-${config.tags.env}-ngw-${Fn.element(availabilityZones.names, index)}`,
        ...config.tags
      }
    })

    const natGateway = new NatGateway(scope, `${statementPrefix}-nat-gateway-${index}`, {
      allocationId: eip.id,
      subnetId: subnet.id,
      tags: {
        Name: `${config.tags.service}-${config.tags.env}-ngw-${Fn.element(availabilityZones.names, index)}`,
        ...config.tags
      }
    })

    const privateRouteTable = new RouteTable(scope, `${statementPrefix}-private-route-table-${index}`, {
      route: [
        {
          cidrBlock: "0.0.0.0/0",
          natGatewayId: natGateway.id
        }
      ],
      tags: {
        Name: `${config.tags.service}-${config.tags.env}-private-route-table-${Fn.element(availabilityZones.names, index)}`,
        ...config.tags
      },
      vpcId: vpc.id
    })

    new RouteTableAssociation(scope, `${statementPrefix}-private-route-table-association-${index}`, {
      routeTableId: privateRouteTable.id,
      subnetId: subnet.id
    })

    return subnet.id
  })

  return {
    vpcId: vpc.id,
    publicSubnetIds: publicSubnetIds,
    privateSubnetIds: privateSubnetIds
  }
}
