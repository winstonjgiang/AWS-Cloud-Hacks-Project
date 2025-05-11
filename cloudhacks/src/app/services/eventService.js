import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../configs/dynamo';

const client = DynamoDBDocumentClient.from(dynamo);

export async function createEvent(event) {
  const command = new PutCommand({
    TableName: 'Events',
    Item: {
        userId: event.userId,
        summary: event.summary,
        start: event.start,
        end: event.end,
    },
  });
  try {
    await client.send(command);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}
