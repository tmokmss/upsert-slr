import type { Handler } from 'aws-lambda';
import type { ResourceProperties } from '../src/types';
import { IAMClient, CreateServiceLinkedRoleCommand, InvalidInputException } from '@aws-sdk/client-iam';
import { setTimeout } from 'timers/promises';

const client = new IAMClient({});

type Event = {
  RequestType: 'Create' | 'Update' | 'Delete';
  ResponseURL: string;
  StackId: string;
  RequestId: string;
  ResourceType: string;
  LogicalResourceId: string;
  ResourceProperties: ResourceProperties;
};

export const handler: Handler<Event> = async (event, context) => {
  try {
    switch (event.RequestType) {
      case 'Create':
      case 'Update':
        console.log(`trying to create a service linked role for ${event.ResourceProperties.awsServiceName}`);
        try {
          const command = new CreateServiceLinkedRoleCommand({
            AWSServiceName: event.ResourceProperties.awsServiceName,
            Description: event.ResourceProperties.description,
            CustomSuffix: event.ResourceProperties.customSuffix,
          });
          await client.send(command);
          console.log('the service linked role created successfully, now waiting for IAM propagation');
          await setTimeout(event.ResourceProperties.waitTimeSeconds * 1000);
        } catch (e) {
          if (e instanceof InvalidInputException) {
            console.log(`The service linked role seems to already exist, skipping the creation... ${e.message}`);
            break;
          } else {
            throw e;
          }
        }
        break;
      case 'Delete':
        break;
    }
    await sendStatus('SUCCESS', event, context);
  } catch (e) {
    const err = e as Error;
    await sendStatus('FAILED', event, context, err.message);
  }
};

const sendStatus = async (status: 'SUCCESS' | 'FAILED', event: Event, context: any, reason?: string) => {
  const props = event.ResourceProperties;
  const physicalId = `${props.awsServiceName}-${props.customSuffix ?? ''}`;
  const responseBody = JSON.stringify({
    Status: status,
    Reason: (reason ?? '') + ' See the details in CloudWatch Log Stream: ' + context.logStreamName,
    PhysicalResourceId: physicalId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    NoEcho: false,
    Data: {},
  });

  const res = await fetch(event.ResponseURL, {
    method: 'PUT',
    body: responseBody,
    headers: {
      'Content-Type': '',
      'Content-Length': responseBody.length.toString(),
    },
  });
  await res.text();
};
