import { Stack, Box, Heading, Grid, Text, useColorModeValue, Flex, Badge } from "@chakra-ui/react";

export default function AdditionalDetailPanel({ categoryData, recurringEvents }) {
    return (
        <Stack spacing={8}>
        {/* Category Summary Section */}
        <Box>
          <Heading size="sm" mb={4}>Category Summary</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
            {categoryData.map((category, index) => {
              const [hours, eventCount] = category.value;
              const totalEvents = categoryData.reduce((sum, cat) => sum + Number(cat.value[1]), 0);
              const eventPercentage = Math.round((eventCount / totalEvents) * 100);
              const hoursPerDay = (hours / 7).toFixed(1);

              return (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg={useColorModeValue("gray.50", "gray.700")}
                >
                  <Flex align="center" mb={3}>
                    <Box
                      boxSize={3}
                      rounded="full"
                      bg={['blue.400', 'green.400', 'yellow.400'][index]}
                      mr={2}
                    />
                    <Text fontWeight="medium">{category.name}</Text>
                  </Flex>
                  <Stack spacing={2}>
                    <Flex justify="space-between">
                      <Text fontSize="sm" color="gray.500">Frequency of Events</Text>
                      <Text fontWeight="medium">{eventCount}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontSize="sm" color="gray.500">Average Hours/Day</Text>
                      <Text fontWeight="medium">{hoursPerDay}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontSize="sm" color="gray.500">Total Hours This Week</Text>
                      <Text fontWeight="medium">{hours.toFixed(1)}</Text>
                    </Flex>
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        </Box>

        {/* Recurring Events Section with visible scroll */}
        <Box>
          <Heading size="sm" mb={4}>Recurring Events</Heading>
          <Box
            maxH="600px"
            overflowY="auto"
            pr={4} // Increased right padding for more visible scrollbar
            css={{
              '&::-webkit-scrollbar': {
                width: '8px', // Increased width
                backgroundColor: useColorModeValue('gray.100', 'gray.700'),
              },
              '&::-webkit-scrollbar-track': {
                width: '10px',
                backgroundColor: useColorModeValue('gray.100', 'gray.700'),
                borderRadius: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: useColorModeValue('gray.400', 'gray.500'),
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: useColorModeValue('gray.500', 'gray.600'),
                }
              },
              // For Firefox
              scrollbarWidth: 'thin',
              scrollbarColor: `${useColorModeValue('rgba(0,0,0,0.3)', 'rgba(255,255,255,0.3)')} ${useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}`,
            }}
            borderRadius="md" // Added to make sure scrollbar corners are rounded
          >
            <Stack spacing={6} pr={2}> {/* Added right padding to content to prevent overlap with scrollbar */}
              {Object.entries(recurringEvents).map(([category, events]) => (
                <Box key={category}>
                  <Flex align="center" mb={4}>
                    <Box
                      boxSize={3}
                      rounded="full"
                      bg={category === "Academic" ? "blue.400" : category === "Exercise" ? "green.400" : "yellow.400"}
                      mr={2}
                    />
                    <Text fontWeight="medium">{category}</Text>
                  </Flex>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    {Object.entries(events).map(([eventName, [hours, count]]) => (
                      <Box
                        key={eventName}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        bg={useColorModeValue(
                          // Light mode colors - very subtle
                          category === "Academic" ? "blue.50" :
                            category === "Exercise" ? "green.50" :
                              "yellow.50",
                          // Dark mode colors - also subtle
                          category === "Academic" ? "blue.900" :
                            category === "Exercise" ? "green.900" :
                              "yellow.900"
                        )}
                        borderColor={
                          category === "Academic" ? "blue.200" :
                            category === "Exercise" ? "green.200" :
                              "yellow.200"
                        }
                      >
                        <Flex justify="space-between" align="center" mb={2}>
                          <Text
                            fontWeight="medium"
                            color={useColorModeValue(
                              // Light mode text color
                              category === "Academic" ? "blue.800" :
                                category === "Exercise" ? "green.800" :
                                  "yellow.800",
                              // Dark mode text color
                              category === "Academic" ? "blue.100" :
                                category === "Exercise" ? "green.100" :
                                  "yellow.100"
                            )}
                          >
                            {eventName}
                          </Text>
                          <Badge
                            colorScheme={category === "Academic" ? "blue" : category === "Exercise" ? "green" : "yellow"}
                          >
                            {count} times
                          </Badge>
                        </Flex>

                        <Stack spacing={2}>
                          <Flex justify="space-between">
                            <Text fontSize="sm" color="gray.500">Total Time</Text>
                            <Text fontSize="sm" fontWeight="medium">{hours.toFixed(1)} hours</Text>
                          </Flex>

                          <Flex justify="space-between">
                            <Text fontSize="sm" color="gray.500">Average Duration</Text>
                            <Text fontSize="sm" fontWeight="medium">
                              {(hours / count).toFixed(1)} hours/session
                            </Text>
                          </Flex>
                        </Stack>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    );
}