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
Each category has an array of 2 numbers, the first number is the duration in hours, and the second number is the frequency of that category.

Sum up the total hours spent in each category:
- Academic
- Exercise
- Personal/Other

Please also include all recurring events in the Recurring_Events object, put them in the category that best describes them. 
Like the categories, in recurring events, the first number is the total hours spent on the event, and the second number is the frequency of the event.

You MUST return ONLY a JSON object with the following format, with no additional text or explanation:
{
  "userId": {
    "Categories": {
      "Academic": [0.0, 0.0],
      "Exercise": [0.0, 0.0],
      "Personal": [0.0, 0.0],
    },
    "summary": "A 5-6 sentence analysis of their time distribution, highlighting notable patterns or comparisons. For example: 'You spent 3.5 hours exercising this week, 70% more than your academic time!' or 'Your work and social activities were perfectly balanced, each taking about 10 hours."
    "Recurring_Events": {
      "Academic": {
        "Event_Name": [0.0, 0.0],
      },
      "Exercise": {
        "Event_Name": [0.0, 0.0],
      },
      "Personal": {
        "Event_Name": [0.0, 0.0],
      }
    }
    "Tips": {
      "Academic": "Based on the user's schedule, provide one tip for the user to improve their efficiency or make the most of their time",
      "Exercise": "Based on the user's schedule, provide one tip for the user to improve their health or fitness",
      "Personal": "Based on the user's schedule, provide one tip for the user to improve their work-life balance",
      "General": "Based on the user's schedule, provide one tip for the user to improve their overall time distribution"
    }
  }
}

Make the summary insightful and specific to the user's time distribution, and have a hint of a fun tone. 
Compare categories, note significant differences, or highlight interesting patterns, preferably with actual hours for readability.
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

    // console.log("Sending request to Bedrock:", JSON.stringify(input, null, 2));

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
