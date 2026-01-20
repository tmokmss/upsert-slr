import { readFileSync } from 'fs';
import { join } from 'path';
import { CustomResource, Duration } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Runtime, RuntimeFamily, SingletonFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ResourceProperties } from './types';

export interface ServiceLinkedRoleProps {
  /**
   * The service principal for the AWS service to which this role is attached.
   *
   * You use a string similar to a URL but without the http:// in front. For example: elasticbeanstalk.amazonaws.com .
   *
   * Service principals are unique and case-sensitive. To find the exact service principal for your service-linked role, see AWS services that work with IAM in the IAM User Guide. Look for the services that have Yes in the Service-Linked Role column. Choose the Yes link to view the service-linked role documentation for that service.
   * https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html
   */
  readonly awsServiceName: string;

  /**
   * The description of the role. This is only used when creating a new role.
   * When there is an existing role for the aws service, this field is ignored.
   *
   * @default no description
   */
  readonly description?: string;
}

export class ServiceLinkedRole extends Construct {
  constructor(scope: Construct, id: string, props: ServiceLinkedRoleProps) {
    super(scope, id);

    const handler = new SingletonFunction(this, 'CustomResourceHandler', {
      // Use raw string to avoid from tightening CDK version requirement
      runtime: new Runtime('nodejs24.x', RuntimeFamily.NODEJS, { supportsInlineCode: true }),
      code: Code.fromInline(readFileSync(join(__dirname, '../', 'lambda', 'dist', 'index.js')).toString()),
      handler: 'index.handler',
      uuid: '8f7be66a-3315-474b-aea1-6ceca43d27c3', // generated for this construct
      lambdaPurpose: 'UpsertSlrCustomResourceHandler',
      timeout: Duration.minutes(3),
      memorySize: 128,
    });

    handler.addToRolePolicy(
      new PolicyStatement({
        actions: ['iam:CreateServiceLinkedRole'],
        resources: ['*'],
      }),
    );

    const properties: ResourceProperties = {
      awsServiceName: props.awsServiceName,
      description: props.description,
      waitTimeSeconds: Duration.minutes(1).toSeconds(),
    };

    new CustomResource(this, 'Default', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::UpsertServiceLinkedRole',
      properties,
    });
  }
}
