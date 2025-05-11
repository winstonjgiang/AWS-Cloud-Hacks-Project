export async function invokeBedrockAPI({ userId, events }) {
  try {
    if (!userId || !events) {
      throw new Error("userId and events are required");
    }

    const response = await fetch("/api/bedrock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, events }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Bedrock API response:", result);
    return result;
  } catch (error) {
    console.error("Error calling Bedrock API:", error);
    throw error;
  }
}
