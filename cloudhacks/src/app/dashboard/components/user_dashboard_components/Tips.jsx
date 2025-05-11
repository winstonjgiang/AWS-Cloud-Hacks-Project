import {
    Box,
    Text,
    VStack,
    Icon,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import { FaGraduationCap, FaRunning, FaUsers, FaChartLine } from "react-icons/fa";

export default function TipsPanel({ categoryData, recurringEvents, aiTips }) {
    const iconColor = "#FF9900"; // AWS Orange

    // Helper function to get category data
    const getCategoryData = (categoryName) => {
        const category = categoryData?.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        return category ? category.value : [0, 0];
    };

    // Get data for each category
    const [academicHours, academicEvents] = getCategoryData("academic");
    const [exerciseHours, exerciseEvents] = getCategoryData("exercise");
    const [socialHours, socialEvents] = getCategoryData("personal/social");
    const [generalHours, generalEvents] = getCategoryData("general");
    const totalEvents = categoryData?.reduce((sum, cat) => sum + cat.value[1], 0) || 0;
    const recurringCount = recurringEvents ? Object.keys(recurringEvents).length : 0;

    const tips = [
        {
            category: "Academic Focus",
            tip: aiTips?.Academic || `You have ${academicEvents} academic events this week, averaging ${(academicHours / 7).toFixed(1)} hours per day.`,
            color: "blue.400",
            bgColor: useColorModeValue("blue.50", "blue.900"),
            borderColor: useColorModeValue("blue.200", "blue.500"),
            icon: FaGraduationCap // Graduation cap for academics
        },
        {
            category: "Exercise & Wellness",
            tip: aiTips?.Exercise || `With ${exerciseEvents} exercise events scheduled, you're dedicating time to your physical health.`,
            color: "green.400",
            bgColor: useColorModeValue("green.50", "green.900"),
            borderColor: useColorModeValue("green.200", "green.500"),
            icon: FaRunning // Running person for exercise
        },
        {
            category: "Personal & Social Balance",
            tip: aiTips?.Personal || `You've allocated ${(socialHours / 7).toFixed(1)} hours per day for personal and social activities.`,
            color: "yellow.400",
            bgColor: useColorModeValue("yellow.50", "yellow.900"),
            borderColor: useColorModeValue("yellow.200", "yellow.500"),
            icon: FaUsers // Group of people for social
        },
        {
            category: "General",
            tip: aiTips?.General || `Your week includes ${totalEvents} total events with ${recurringCount} recurring activities. A mix of routine and flexibility helps create a sustainable and productive schedule.`,
            color: iconColor,
            bgColor: useColorModeValue("orange.50", "orange.900"),
            borderColor: useColorModeValue("orange.200", "orange.500"),
            icon: FaChartLine // Chart for overview
        }
    ];

    return (
        <VStack spacing={4} align="stretch">
            <Text fontSize="lg" fontWeight="medium" mb={4}>
                AI-Powered Insights
            </Text>
            {tips.map((tip, index) => (
                <Box
                    key={index}
                    p={4}
                    borderRadius="md"
                    bg={tip.bgColor}
                    borderWidth="1px"
                    borderColor={tip.borderColor}
                    transition="all 0.2s"
                    _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md"
                    }}
                >
                    <Flex align="start" gap={3}>
                        <Icon
                            as={tip.icon}
                            color={tip.color}
                            boxSize={5}
                            mt={1}
                        />
                        <Box>
                            <Text fontWeight="bold" color={tip.color} mb={1}>
                                {tip.category}
                            </Text>
                            <Text>{tip.tip}</Text>
                        </Box>
                    </Flex>
                </Box>
            ))}
        </VStack>
    );
}