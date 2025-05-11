import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { getUserEvents } from "@/app/services/dynamo";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const modelID = "anthropic.claude-3-5-sonnet-20241022-v2:0";

const prompt = `
You are a helpful AI assistant that ONLY returns valid JSON responses.
You will be given a JSON object containing events for a single user.
Classify their events into the following categories, which represents how many individual events occurred in each category:
- Academic
- Exercise
- Personal/Other

You MUST return ONLY a JSON object with the following format, with no additional text or explanation:
{
  "userId": {
    "Academic": 0,
    "Exercise": 0,
    "Personal/Other": 0,
    "summary": "A 1-2 sentence analysis of their event distribution, highlighting notable patterns or comparisons. For example: 'This week you exercised 70% more than you went to class!' or 'Your work and social activities were perfectly balanced this week.'"
  }
}

Make the summary insightful and specific to the user's event distribution, and have a hint of a fun tone. 
Compare categories, note significant differences, or highlight interesting patterns, preferably with percentages for readability.
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, events } = body;

    if (!userId || !events) {
      return Response.json(
        { error: "userId and events are required" },
        { status: 400 }
      );
    }

    // Get events for the specific user
    const userEvents = await getUserEvents(userId);
    console.log("Fetched events for user:", userEvents);

    const input = {
      modelId: modelID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 5000,
        temperature: 0.7,
        top_p: 0.999,
        top_k: 250,
        stop_sequences: [],
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `${prompt}\n\nHere are the events for the user:\n${JSON.stringify(
                  { [userId]: userEvents },
                  null,
                  2
                )}`,
              },
            ],
          },
        ],
      }),
    };

    console.log("Sending request to Bedrock:", JSON.stringify(input, null, 2));

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const content = responseBody.content[0].text;

    console.log("Raw model response:", content);

    // Parse the response as JSON
    const parsedResponse = JSON.parse(content);
    console.log("Parsed response:", parsedResponse);

    return Response.json(parsedResponse);
  } catch (error) {
    console.error("Error in Bedrock API:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
