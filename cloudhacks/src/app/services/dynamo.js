import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "us-west-2" });

/**
 * Fetches events for a specific user using their Google ID as the partition key
 * @param {string} userId - The user's Google ID
 * @returns {Promise<Array>} Array of events for the user
 */
export async function getUserEvents(userId) {
  try {
    console.log("Fetching events for user:", userId);

    const command = new QueryCommand({
      TableName: "Events",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    });

    const response = await client.send(command);
    const events = response.Items.map((item) => unmarshall(item));

    // Calculate duration for each event
    const eventsWithDuration = events.map((event) => ({
      ...event,
      durationInHours:
        (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60),
    }));

    console.log(`Found ${eventsWithDuration.length} events for user ${userId}`);
    return eventsWithDuration;
  } catch (error) {
    console.error("Error fetching user events from DynamoDB:", error);
    throw error;
  }
}

/**
 * Fetches events for a specific user within a date range using their Google ID as the partition key
 * @param {string} userId - The user's Google ID
 * @param {string} startDate - Start date in ISO format
 * @param {string} endDate - End date in ISO format
 * @returns {Promise<Array>} Array of events for the user within the date range
 */
export async function getUserEventsByDateRange(userId, startDate, endDate) {
  try {
    console.log(
      `Fetching events for user ${userId} between ${startDate} and ${endDate}`
    );

    const command = new QueryCommand({
      TableName: "Events",
      KeyConditionExpression:
        "userId = :userId AND startDate BETWEEN :startDate AND :endDate",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
        ":startDate": { S: startDate },
        ":endDate": { S: endDate },
      },
    });

    const response = await client.send(command);
    const events = response.Items.map((item) => unmarshall(item));

    // Calculate duration for each event
    const eventsWithDuration = events.map((event) => ({
      ...event,
      durationInHours:
        (new Date(event.end) - new Date(event.start)) / (1000 * 60 * 60),
    }));

    console.log(
      `Found ${eventsWithDuration.length} events for user ${userId} in date range`
    );
    return eventsWithDuration;
  } catch (error) {
    console.error(
      "Error fetching user events by date range from DynamoDB:",
      error
    );
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
    const command = new QueryCommand({
      TableName: "Events",
      KeyConditionExpression: "startDate BETWEEN :startDate AND :endDate",
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
