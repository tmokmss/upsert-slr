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
        const command = new CreateServiceLinkedRoleCommand({
          AWSServiceName: event.ResourceProperties.awsServiceName,
          Description: event.ResourceProperties.description,
        });
        await client.send(command);
        console.log('the service linked role created successfully, now waiting for IAM propagation');
        await setTimeout(60 * 1000);
        break;
      case 'Update':
        break;
      case 'Delete':
        break;
    }
    await sendStatus('SUCCESS', event, context);
  } catch (e) {
    if (e instanceof InvalidInputException) {
      console.log(`The service linked role seems to already exist, skipping the creation... ${e.message}`);
      await sendStatus('SUCCESS', event, context);
    } else {
      const err = e as Error;
      await sendStatus('FAILED', event, context, err.message);
    }
  }
};

const sendStatus = async (status: 'SUCCESS' | 'FAILED', event: Event, context: any, reason?: string) => {
  const responseBody = JSON.stringify({
    Status: status,
    Reason: reason ?? 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    NoEcho: false,
    Data: {},
  });

  await fetch(event.ResponseURL, {
    method: 'PUT',
    body: responseBody,
    headers: {
      'Content-Type': '',
      'Content-Length': responseBody.length.toString(),
    },
  });
};
