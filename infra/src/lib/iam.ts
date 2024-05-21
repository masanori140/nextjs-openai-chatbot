import { DataAwsIamPolicyDocument } from "@cdktf/provider-aws/lib/data-aws-iam-policy-document"
import { IamPolicy, IamPolicyConfig } from "@cdktf/provider-aws/lib/iam-policy"
import { IamRole, IamRoleConfig } from "@cdktf/provider-aws/lib/iam-role"
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment"
import { Construct } from "constructs"

export const createIamRole = (
  scope: Construct,
  statementPrefix: string,
  roleConfig: IamRoleConfig,
  policyConfig?: IamPolicyConfig
): { arn: string } => {
  const iamRole = new IamRole(scope, `${statementPrefix}-role`, <IamRoleConfig>{
    assumeRolePolicy: roleConfig.assumeRolePolicy,
    description: roleConfig.description,
    managedPolicyArns: roleConfig.managedPolicyArns || [],
    name: roleConfig.name,
    tags: {
      Name: roleConfig.name,
      ...roleConfig.tags
    }
  })

  if (policyConfig) {
    const iamPolicy = new IamPolicy(scope, `${statementPrefix}-policy`, <IamPolicyConfig>{
      description: policyConfig.description,
      name: policyConfig.name,
      policy: policyConfig.policy,
      tags: {
        Name: policyConfig.name,
        ...policyConfig.tags
      }
    })

    new IamRolePolicyAttachment(scope, `${statementPrefix}-attachment`, {
      policyArn: iamPolicy.arn,
      role: iamRole.name
    })
  }

  return { arn: iamRole.arn }
}

export const createTrustPolicyDocument = (
  scope: Construct,
  statementPrefix: string,
  servicePrincipal: string
): string => {
  const document = new DataAwsIamPolicyDocument(scope, `${statementPrefix}-trust-policy-document`, {
    statement: [
      {
        actions: ["sts:AssumeRole"],
        effect: "Allow",
        principals: [
          {
            identifiers: [servicePrincipal],
            type: "Service"
          }
        ]
      }
    ]
  })

  return document.json
}
