// src/app/services/userService.js
import { PutCommand, DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../configs/dynamo';

const client = DynamoDBDocumentClient.from(dynamo);

export async function createUser(user) {
  //Create user and prep to be sent to DynamoDB
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

export async function getUser(userId) {
  //Get user from DynamoDB
  const command = new GetCommand({
    TableName: 'Users',
    Key: { userId },
  });

  try {
    const response = await client.send(command);
    console.log('Fetching user:', userId);
    return response.Item;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}
