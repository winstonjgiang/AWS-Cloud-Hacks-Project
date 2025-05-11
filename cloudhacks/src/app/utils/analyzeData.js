import { invokeBedrockAPI } from "../services/bedrock";

export const analyzeData = async (eventsData, user, setCategoryData) => {
    try {
      if (!user?.googleId) {
        console.error("Cannot analyze data: Google user ID is not available");
        return;
      }

      console.log("Analyzing data for user:", user.googleId);
      const analysis = await invokeBedrockAPI({
        userId: user.googleId,
        events: eventsData
      });

      if (analysis && Object.keys(analysis).length > 0) {
        const userId = Object.keys(analysis)[0];
        const userData = analysis[userId];
        const chartData = Object.entries(userData)
          .filter(([key]) => key !== 'summary')
          .map(([name, value]) => ({ name, value }));
        setCategoryData(chartData);
        console.log(chartData);
      }
    } catch (error) {
      console.error("Error analyzing data:", error);
    }
  };