import { invokeBedrockAPI } from "../services/bedrock";



export const analyzeData = async (eventsData, setCategoryData) => {
    try {
      const analysis = await invokeBedrockAPI(eventsData);
      if (analysis && Object.keys(analysis).length > 0) {
        const userId = Object.keys(analysis)[0];
        const userData = analysis[userId];
        const chartData = Object.entries(userData)
          .filter(([key]) => key !== "summary")
          .map(([name, value]) => ({ name, value }));
        setCategoryData(chartData);
      }
    } catch (error) {
      console.error("Error analyzing data:", error);
    }
  };
