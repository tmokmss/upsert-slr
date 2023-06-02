import { IAMClient, CreateServiceLinkedRoleCommand, InvalidInputException } from '@aws-sdk/client-iam'; // ES Modules import
const client = new IAMClient({});

const main = async () => {
  try {
    const command = new CreateServiceLinkedRoleCommand({
      AWSServiceName: 'elasticbeanstalk.amazonaws.com',
      Description: undefined,
    });
    await client.send(command);
  } catch (e) {
    console.log(e);
    if (e instanceof InvalidInputException) {
      console.log('the SLR already exists');
    } else {
      throw e;
    }
  }
};
main();
