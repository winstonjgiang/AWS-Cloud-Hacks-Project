// src/app/services/userService.js
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../configs/dynamo';

const client = DynamoDBDocumentClient.from(dynamo);

export async function createUser(user) {
  const command = new PutCommand({
    TableName: 'Users',
    Item: {
      userId:    user.userId,
      email:     user.email,
      createdAt: user.createdAt,
      name:      user.name,
      googleId:  user.googleId
    },
  });

  try {
    await client.send(command);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}