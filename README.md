# Upsert Service Linked Role
AWS CDK construct to create a [service linked role (SLR)](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html) when there is no SLR for the same service, and if any skip the creation process.

## Why do we need this?
CloudFormation also supports to create a service linked role ([doc](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-resource-iam-servicelinkedrole.html)). Why do we need this?

Because the resource behaves weirdly when there is already a role with the same name. All we need is to simply create a service linked role if necessary, and skip it if it already exists. Such behavior like upsert is achieved by this construct, `upsert-slr`.

This construct also waits for some time after creating a role to avoid the delay of IAM propagation.

## Usage
```sh
npm i upsert-slr
```

```ts
import { ServiceLinkedRole } from 'upsert-slr';

new ServiceLinkedRole(this, 'ElasticsearchSlr', {
    awsServiceName: 'es.amazonaws.com',
    description: 'Service linked role for Elasticsearch',
});
```
