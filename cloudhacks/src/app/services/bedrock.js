export async function testBedrockAPI(events) {
  try {
    const response = await fetch("/api/bedrock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Test successful! Model response:", result);
    return result;
  } catch (error) {
    console.error("Error testing Bedrock API:", error);
    throw error;
  }
}
