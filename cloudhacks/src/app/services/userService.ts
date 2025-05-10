import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "../configs/dynamo";
import { User } from "../models/User";

const client = DynamoDBDocumentClient.from(dynamo); // DynamoDBDocumentClient is a client for DynamoDB (high level client)
export const createUser = async (user: User) =>  {
    const command = new PutCommand({
        TableName: "Users",
        Item: {
            userId: user.userId,
            email: user.email,
            createdAt: user.createdAt,
            name: user.name,
        }
    });

    try { 
        await client.send(command);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

