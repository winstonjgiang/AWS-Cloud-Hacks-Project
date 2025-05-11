"use client";
// CalendarStatsDemo.jsx
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { CalendarIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

export default function CalendarStatsDemo() {
  const [tabIndex, setTabIndex] = useState(0);
  const bg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.500");

  return (
    <Box
      maxW="600px"
      w="100%"
      bg={bg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      shadow="lg"
      p={6}
    >
      {/* Header */}
      <Flex mb={6} align="center" justify="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Your Time Analytics
          </Text>
          <Text fontSize="sm" color="gray.500">
            Last 30 days
          </Text>
        </Box>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </Flex>

      {/* Tabs */}
      <Tabs index={tabIndex} onChange={setTabIndex} variant="enclosed">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Categories</Tab>
          <Tab>Trends</Tab>
        </TabList>

        <TabPanels pt={6}>
          {/* Overview */}
          <TabPanel p={0}>
            <Stack spacing={4}>
              <Flex gap={4}>
                <StatCard
                  title="Meeting Hours"
                  value="42.5"
                  change="+2.3%"
                  trend="up"
                  icon={<CalendarIcon />}
                  cardBg={cardBg}
                  borderColor={borderColor}
                />
                <StatCard
                  title="Focus Time"
                  value="68.2"
                  change="+5.7%"
                  trend="up"
                  icon={<CalendarIcon />}
                  cardBg={cardBg}
                  borderColor={borderColor}
                />
              </Flex>

              {/* Bar chart */}
              <Box
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
                borderRadius="md"
                p={4}
              >
                <Text mb={3} fontWeight="medium">
                  Time Distribution
                </Text>
                <Flex h="200px" align="flex-end" gap={2}>
                  {[65, 40, 85, 30, 55, 60, 45].map((h, i) => (
                    <Box
                      key={i}
                      flex="1"
                      bg="teal.400"
                      borderTopRadius="md"
                      h={`${h}%`}
                      position="relative"
                    >
                      <Text
                        position="absolute"
                        bottom="-1.5em"
                        left="50%"
                        transform="translateX(-50%)"
                        fontSize="xs"
                      >
                        {["M", "T", "W", "T", "F", "S", "S"][i]}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Stack>
          </TabPanel>

          {/* Categories */}
          <TabPanel p={0}>
            <Box
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
            >
              <Text mb={3} fontWeight="medium">
                Category Breakdown
              </Text>
              <Flex justify="center" align="center" h="200px">
                {/* Simplified three‐slice pie using overlapping Boxes */}
                <Box
                  position="relative"
                  w="180px"
                  h="180px"
                  borderRadius="full"
                  border="16px solid teal.200"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    borderRadius="full"
                    border="16px solid teal.500"
                    clipPath="polygon(50% 50%, 50% 0%, 100% 0%, 100% 70%, 50% 50%)"
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    borderRadius="full"
                    border="16px solid teal.400"
                    clipPath="polygon(50% 50%, 100% 70%, 100% 100%, 30% 100%, 50% 50%)"
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    borderRadius="full"
                    border="16px solid teal.300"
                    clipPath="polygon(50% 50%, 30% 100%, 0% 100%, 0% 0%, 50% 0%)"
                  />
                </Box>
              </Flex>
              <Flex mt={4} justify="space-between" fontSize="sm">
                <Flex align="center" gap={1}>
                  <Box w={3} h={3} bg="teal.500" borderRadius="full" />
                  <Text>Meetings (35%)</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Box w={3} h={3} bg="teal.400" borderRadius="full" />
                  <Text>Focus (40%)</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Box w={3} h={3} bg="teal.300" borderRadius="full" />
                  <Text>Admin (25%)</Text>
                </Flex>
              </Flex>
            </Box>
          </TabPanel>

          {/* Trends */}
          <TabPanel p={0}>
            <Box
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
            >
              <Text mb={3} fontWeight="medium">
                Monthly Trends
              </Text>
              <Box position="relative" h="200px" mb={4}>
                <svg
                  viewBox="0 0 300 200"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                >
                  <polyline
                    points="0,150 50,140 100,100 150,120 200,80 250,60 300,40"
                    fill="none"
                    stroke="teal"
                    strokeWidth="3"
                  />
                  <polyline
                    points="0,180 50,170 100,190 150,160 200,170 250,150 300,160"
                    fill="none"
                    stroke="teal"
                    strokeWidth="3"
                    opacity={0.5}
                  />
                </svg>
                <Flex
                  position="absolute"
                  bottom={0}
                  left={0}
                  w="100%"
                  justify="space-between"
                  fontSize="xs"
                  color="gray.500"
                >
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                    <Text key={m}>{m}</Text>
                  ))}
                </Flex>
              </Box>
              <Flex gap={4} fontSize="sm">
                <Flex align="center" gap={1}>
                  <Box w={3} h={3} bg="teal.500" borderRadius="full" />
                  <Text>Focus Time</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Box
                    w={3}
                    h={3}
                    bg="teal.500"
                    opacity={0.5}
                    borderRadius="full"
                  />
                  <Text>Meeting Time</Text>
                </Flex>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

// StatCard component
function StatCard({ title, value, change, trend, icon, cardBg, borderColor }) {
  return (
    <Box
      flex="1"
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">
          {title}
        </Text>
        {icon}
      </Flex>
      <Flex align="baseline" mt={2}>
        <Text fontSize="2xl" fontWeight="bold">
          {value}
        </Text>
        <Flex
          align="center"
          ml={2}
          fontSize="xs"
          color={trend === "up" ? "green.500" : "red.500"}
        >
          {trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <Text ml={1}>{change}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
