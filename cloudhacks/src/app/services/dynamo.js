import {
  DynamoDBClient,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-west-2" });

/**
 * Fetches all events from DynamoDB and returns summaries grouped by userId
 * @returns {Promise<Object>} Object with userIds as keys and arrays of summaries as values
 */
export async function getAllEvents() {
  try {
    console.log("Fetching events from DynamoDB...");

    const command = new ScanCommand({
      TableName: "Events",
    });

    const response = await client.send(command);
    const unmarshalledItems = response.Items.map((item) => unmarshall(item));

    // Group events by userId
    const eventsByUser = unmarshalledItems.reduce((acc, event) => {
      const userId = event.userId;
      if (!acc[userId]) {
        acc[userId] = [];
      }

      // Calculate duration in hours
      const startTime = new Date(event.start);
      const endTime = new Date(event.end);
      const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours

      acc[userId].push({
        summary: event.summary,
        durationInHours: durationInHours,
      });
      return acc;
    }, {});

    console.log(
      "Events grouped by user:",
      JSON.stringify(eventsByUser, null, 2)
    );

    return eventsByUser;
  } catch (error) {
    console.error("Error fetching events from DynamoDB:", error);
    throw error;
  }
}

/**
 * Fetches events for a specific user
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of events for the user
 */
export async function getUserEvents(userId) {
  try {
    const command = new QueryCommand({
      TableName: "Events",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const response = await client.send(command);
    return response.Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error("Error fetching user events from DynamoDB:", error);
    throw error;
  }
}

/**
 * Fetches events within a date range
 * @param {string} startDate - Start date in ISO format
 * @param {string} endDate - End date in ISO format
 * @returns {Promise<Array>} Array of events within the date range
 */
export async function getEventsByDateRange(startDate, endDate) {
  try {
    const command = new ScanCommand({
      TableName: "Events",
      FilterExpression: "startDate BETWEEN :startDate AND :endDate",
      ExpressionAttributeValues: {
        ":startDate": { S: startDate },
        ":endDate": { S: endDate },
      },
    });

    const response = await client.send(command);
    return response.Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error("Error fetching events by date range from DynamoDB:", error);
    throw error;
  }
}
