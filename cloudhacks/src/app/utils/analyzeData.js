import { invokeBedrockAPI } from "../services/bedrock";

export const analyzeData = async (
  eventsData,
  user,
  setCategoryData,
  setSummary,
  setRecurringEvents,
  setAiTips
) => {
  try {
    if (!user?.googleId) {
      console.error("Cannot analyze data: Google user ID is not available");
      return;
    }

    if (!Array.isArray(eventsData) || eventsData.length === 0) {
      console.warn("No events data provided");
      return;
    }

    console.log("Analyzing data for user:", user.googleId);
    const analysis = await invokeBedrockAPI({
      userId: user.googleId,
      events: eventsData,
    });

    // make sure we got something back
    if (
      !analysis ||
      typeof analysis !== "object" ||
      Object.keys(analysis).length === 0
    ) {
      console.warn("Empty analysis result");
      return;
    }

    // assume the API returns { "<userId>": { summary, Categories, Recurring_Events } }
    const [firstKey] = Object.keys(analysis);
    const userData = analysis[firstKey];

    console.log("RAW USER DATA:", userData);

    // 1) summary
    setSummary(userData.summary || "");

    // 2) categories: build the array your chart needs
    const chartData = userData.Categories
      ? Object.entries(userData.Categories).map(([name, value]) => ({
          name,
          value,
        }))
      : [];
    setCategoryData(chartData);

    // 3) recurring events
    setRecurringEvents(userData.Recurring_Events || []);

    // 4) ai tips
    setAiTips(userData.Tips);
  } catch (error) {
    console.error("Error analyzing data:", error);
  }
};
