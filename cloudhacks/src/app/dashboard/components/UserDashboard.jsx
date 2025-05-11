"use client";
import {
  Box,
  Grid,
  Heading,
  Text,
  Card,
  CardBody,
  Stack,
  Progress,
  Icon,
  Flex,
  useColorModeValue,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { FaBook, FaRunning, FaHeart, FaClock } from "react-icons/fa";
import CategoryPieChart from "./CategoryPieChart";

export default function UserDashboard({ categoryData, summary }) {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Transform the categoryData into usable stats
  const getStatsFromCategoryData = () => {
    if (!categoryData) return null;

    // Calculate total from the array of objects
    console.log("SUMMARY:", summary);
    const total = categoryData.reduce((sum, item) => sum + Number(item.value), 0);

    return [
      {
        title: "Academic Time",
        value: Number(categoryData[0]?.value || 0),
        progress: Math.round((Number(categoryData[0]?.value || 0) / total * 100)) || 0,
        icon: FaBook,
        color: "blue.400",
      },
      {
        title: "Exercise Time",
        value: Number(categoryData[1]?.value || 0),
        progress: Math.round((Number(categoryData[1]?.value || 0) / total * 100)) || 0,
        icon: FaRunning,
        color: "green.400",
      },
      {
        title: "Personal Time",
        value: Number(categoryData[2]?.value || 0),
        progress: Math.round((Number(categoryData[2]?.value || 0) / total * 100)) || 0,
        icon: FaHeart,
        color: "yellow.400",
      },
      {
        title: "Total Time",
        value: Number(total),
        progress: 100,
        icon: FaClock,
        color: "purple.400",
      },
    ];
  };

  const stats = getStatsFromCategoryData() || [
    {
      title: "Academic Time",
      value: 0,
      progress: 0,
      icon: FaBook,
      color: "blue.400",
    },
    {
      title: "Exercise Time",
      value: 0,
      progress: 0,
      icon: FaRunning,
      color: "green.400",
    },
    {
      title: "Personal Time",
      value: 0,
      progress: 0,
      icon: FaHeart,
      color: "yellow.400",
    },
    {
      title: "Total Time",
      value: 0,
      progress: 0,
      icon: FaClock,
      color: "purple.400",
    },
  ];

  const LoadingStatCard = () => (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
      <CardBody>
        <Flex align="center" mb={2}>
          <Skeleton boxSize={6} mr={2} borderRadius="md" />
          <Skeleton height="20px" width="120px" />
        </Flex>
        <Skeleton height="36px" width="100px" my={2} />
        <Skeleton height="8px" mb={2} borderRadius="full" />
        <Skeleton height="16px" width="140px" />
      </CardBody>
    </Card>
  );

  return (
    <Box p={8} maxW="1400px" mx="auto">
      {/* Header */}
      <Stack spacing={3} mb={8}>
        <Heading size="lg">User Dashboard</Heading>
        <Text color="gray.500">Track your progress and manage your activities</Text>
      </Stack>

      {/* Stats Grid */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        {!categoryData ? (
          // Loading state
          <>
            <LoadingStatCard />
            <LoadingStatCard />
            <LoadingStatCard />
            <LoadingStatCard />
          </>

        ) : (
          // Actual stats
          stats.map((stat, index) => (
            <Card
              key={index}
              bg={cardBg}
              borderColor={borderColor}
              borderWidth="1px"
              borderRadius="lg"
            >
              <CardBody>
                {stat.title === "Total Time" ? (
                  // Special layout for Total Time card
                  <Flex
                    direction="column"
                    height="100%"
                    justify="center"
                    align="center"
                    textAlign="center"
                    py={2}
                  >
                    <Flex align="center" mb={3}>
                      <Icon as={stat.icon} color={stat.color} boxSize={7} mr={2} />
                      <Text color="gray.500" fontSize="lg">{stat.title}</Text>
                    </Flex>
                    <Text
                      fontSize="3xl"
                      fontWeight="bold"
                      color="black"
                    >
                      {typeof stat.value === 'number' ? stat.value.toFixed(1) : '0.0'} hours
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      spent this week on events
                    </Text>
                  </Flex>
                ) : (
                  // Regular layout for other cards
                  <>
                    <Flex align="center" mb={2}>
                      <Icon as={stat.icon} color={stat.color} boxSize={6} mr={2} />
                      <Text color="gray.500">{stat.title}</Text>
                    </Flex>
                    <Text fontSize="2xl" fontWeight="bold" mb={2}>
                      {typeof stat.value === 'number' ? stat.value.toFixed(1) : '0.0'} hours
                    </Text>
                    <Progress
                      value={stat.progress}
                      size="sm"
                      colorScheme={stat.color.split(".")[0]}
                      borderRadius="full"
                    />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      {stat.progress}% of your weekly time spent
                    </Text>
                  </>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </Grid>

      {/* Summary Section */}
      <Card
        bg={cardBg}
        borderColor={borderColor}
        borderWidth="1px"
        borderRadius="lg"
        mb={8}
      >
        <CardBody>
          <Flex align="center" gap={3} mb={4}>
            <Icon as={FaClock} color="blue.400" boxSize={6} />
            <Heading size="sm">Weekly Summary</Heading>
          </Flex>
          {!categoryData ? (
            <SkeletonText noOfLines={3} spacing='4' skeletonHeight='4' />
          ) : (
            <Text color="gray.600">
              {summary}
            </Text>
          )}
        </CardBody>
      </Card>

      {/* Visualization Section */}
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
        <CardBody>
          <Heading size="md" mb={6}>Your Week, Visualized</Heading>
          {!categoryData ? (
            <Box height="400px" position="relative">
              <Flex
                direction="column"
                align="center"
                justify="center"
                height="100%"
                gap={4}
              >
                <Skeleton height="200px" width="200px" borderRadius="full" />
                <SkeletonText noOfLines={2} spacing='4' skeletonHeight='4' textAlign="center" />
              </Flex>
            </Box>
          ) : (
            <CategoryPieChart data={categoryData} />
          )}
        </CardBody>
      </Card>
    </Box>
  );
}
