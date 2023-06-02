import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { Stack, StackProps, App } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServiceLinkedRole } from '../src';

const app = new App();

class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    new ServiceLinkedRole(this, 'Beanstalk', {
      awsServiceName: 'elasticbeanstalk.amazonaws.com',
      description: 'Service linked role for ElasticBeanstalk',
    });

    new ServiceLinkedRole(this, 'Beanstalk2', {
      awsServiceName: 'elasticbeanstalk.amazonaws.com',
      description: 'Service linked role for ElasticBeanstalk 2',
    });

    new ServiceLinkedRole(this, 'Elasticsearch', {
      awsServiceName: 'es.amazonaws.com',
      description: 'Service linked role for Elasticsearch',
    });
  }
}

const stack = new TestStack(app, 'IntegTest');

new IntegTest(app, 'Test', {
  testCases: [stack],
  diffAssets: true,
});
