/**
  Create new instance client of DynamoDB
 **/

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = new DynamoDBClient({ region: "us-west-2" });  