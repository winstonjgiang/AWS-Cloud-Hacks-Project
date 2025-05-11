// components/VisualizationSection.jsx
import {
  Card,
  CardBody,
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import CategoryPieChart from "./CategoryPieChart";
import AdditionalDetailPanel from "./AdditionalDetailPanel";
import TipsPanel from "./Tips";

export default function VisualizationSection({ categoryData, isLoading, recurringEvents, aiTips }) {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const titleColor = "#232F3E";
  const accentColor = "#FF9900";
  const boxBg = useColorModeValue("gray.50", "gray.700");
  const progressBoxBg = useColorModeValue("gray.50", "gray.700");

  // Add data validation check
  const isDataValid = categoryData && Array.isArray(categoryData) && categoryData.length > 0;

  if (isLoading || !isDataValid) {
    return (
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
        <CardBody>
          <Heading size="md" mb={6} color={titleColor}>
            Your Week,
            <Text as="span" color={accentColor} ml={2}>
              Visualized
            </Text>
          </Heading>
          <Box height="400px" position="relative">
            <Flex direction="column" align="center" justify="center" height="100%" gap={4}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color={accentColor}
                size='xl'
                label='Loading data'
              />
              <Text color="gray.500" fontSize="sm">
                Loading your weekly insights...
              </Text>
            </Flex>
          </Box>
        </CardBody>
      </Card>
    );
  }

  // Safe calculation functions
  const calculateEventPercentage = (events, totalEvents) => {
    if (!totalEvents || isNaN(totalEvents) || totalEvents === 0) return 0;
    return Math.round((events / totalEvents) * 100);
  };

  const calculateHoursPerDay = (hours) => {
    if (!hours || isNaN(hours)) return 0;
    return (hours / 7).toFixed(1);
  };

  const getTotalEvents = (data) => {
    if (!Array.isArray(data)) return 0;
    return data.reduce((sum, cat) => {
      const events = Array.isArray(cat.value) ? Number(cat.value[1]) : 0;
      return sum + (isNaN(events) ? 0 : events);
    }, 0);
  };

  return (
    <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
      <CardBody>
        <Heading size="md" mb={6} color={titleColor}>
          Your Week,
          <Text as="span" color={accentColor} ml={2}>
            Visualized
          </Text>
        </Heading>
        <Tabs variant="enclosed" colorScheme="orange">
          <TabList mb="4">
            <Tab>Overview</Tab>
            <Tab>Detailed Stats</Tab>
            <Tab>AI Tips</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <Box display={{ base: "block", md: "flex" }} gap={8}>
                <Box flex="1">
                  {isDataValid && <CategoryPieChart data={categoryData} />}
                </Box>
                <Box flex="1">
                  <Stack spacing={6}>
                    {isDataValid && categoryData.map((cat, i) => {
                      const [hours = 0, events = 0] = Array.isArray(cat.value) ? cat.value : [0, 0];
                      const totalEvents = getTotalEvents(categoryData);
                      const eventPct = calculateEventPercentage(events, totalEvents);
                      const hrsPerDay = calculateHoursPerDay(hours);
                      const colors = ["blue.400", "green.400", "yellow.400"];

                      return (
                        <Box key={i}>
                          <Flex justify="space-between" align="center" mb={2}>
                            <Flex align="center">
                              <Box boxSize={3} rounded="full" bg={colors[i]} mr={2} />
                              <Text fontWeight="medium">{cat.name}</Text>
                            </Flex>
                            <Text fontWeight="bold">{events || 0} events</Text>
                          </Flex>
                          <Box
                            borderWidth="1px"
                            p={4}
                            borderRadius="md"
                            bg={progressBoxBg}
                          >
                            <Stack spacing={3}>
                              <Progress
                                value={eventPct}
                                size="sm"
                                borderRadius="full"
                                colorScheme={colors[i].split(".")[0]}
                              />
                              <Flex justify="space-between">
                                <Text fontSize="sm" color="gray.500">
                                  {eventPct}% of total events
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  ~{hrsPerDay} hrs/day
                                </Text>
                              </Flex>
                            </Stack>
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel p={0}>
              <AdditionalDetailPanel
                categoryData={categoryData}
                recurringEvents={recurringEvents}
                boxBg={boxBg}
              />
            </TabPanel>
            <TabPanel p={0}>
              <TipsPanel
                categoryData={categoryData}
                recurringEvents={recurringEvents}
                aiTips={aiTips}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}