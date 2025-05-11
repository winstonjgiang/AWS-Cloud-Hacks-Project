import React from 'react';
import { Box, Grid, Flex, Heading, Text, Icon, Progress, Stack } from '@chakra-ui/react';
import { BookOpen, Activity, Heart, Clock } from 'lucide-react';


export default function DashboardMetrics() {
  return (
    <Box 
      bg="white" 
      p={8} 
      rounded="lg" 
      boxShadow="-20px 20px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 16px -8px rgba(0, 0, 0, 0.3)"
      border="1px solid" 
      borderColor="gray.100"
      mx={4}
      my={4}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        background: "transparent",
        zIndex: -1,
      }}
    >
      {/* Header */}
      <Box mb={6}>
        <Heading as="h1" size="xl" color="gray.800" mb={2}>
          User Dashboard
        </Heading>
        <Text color="gray.600">
          Track your progress and manage your activities
        </Text>
      </Box>

      {/* Metrics Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4} mb={8}>
        {/* Academic Hours */}
        <Box bg="white" borderWidth="1px" rounded="lg" p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Academic Hours
          </Text>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              32.5
            </Text>
            <Flex align="center" justify="center" bg="blue.50" rounded="md" h={10} w={10}>
              <Icon as={BookOpen} boxSize={5} color="blue.500" />
            </Flex>
          </Flex>
          <Progress value={47} size="xs" colorScheme="blue" mb={1} rounded="full" />
          <Text fontSize="xs" color="gray.500">
            47% of your weekly goal
          </Text>
        </Box>

        {/* Exercise Time */}
        <Box bg="white" borderWidth="1px" rounded="lg" p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Exercise Time
          </Text>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              28.0
            </Text>
            <Flex align="center" justify="center" bg="green.50" rounded="md" h={10} w={10}>
              <Icon as={Activity} boxSize={5} color="green.500" />
            </Flex>
          </Flex>
          <Progress value={40} size="xs" colorScheme="green" mb={1} rounded="full" />
          <Text fontSize="xs" color="gray.500">
            40% of your weekly goal
          </Text>
        </Box>

        {/* Personal Time */}
        <Box bg="white" borderWidth="1px" rounded="lg" p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Personal Time
          </Text>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              9.0
            </Text>
            <Flex align="center" justify="center" bg="yellow.50" rounded="md" h={10} w={10}>
              <Icon as={Heart} boxSize={5} color="yellow.500" />
            </Flex>
          </Flex>
          <Progress value={13} size="xs" colorScheme="yellow" mb={1} rounded="full" />
          <Text fontSize="xs" color="gray.500">
            13% of your weekly goal
          </Text>
        </Box>

        {/* Total Hours */}
        <Box bg="white" borderWidth="1px" rounded="lg" p={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={3}>
            Total Hours
          </Text>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              69.5
            </Text>
            <Flex align="center" justify="center" bg="purple.50" rounded="md" h={10} w={10}>
              <Icon as={Clock} boxSize={5} color="purple.500" />
            </Flex>
          </Flex>
          <Progress value={83} size="xs" colorScheme="purple" mb={1} rounded="full" />
          <Text fontSize="xs" color="gray.500">
            83% of your weekly capacity
          </Text>
        </Box>
      </Grid>

      {/* Visualization Section */}
      <Box borderWidth="1px" rounded="lg" bg="white" p={6}>
        <Heading as="h2" size="lg" color="gray.800" mb={6}>
          Your Week, Visualized
        </Heading>

        <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="center">
          {/* Total Hours Box */}
          <Box bg="gray.100" p={8} rounded="md" d="flex" flexDir="column" alignItems="center" justifyContent="center" w={48} h={48}>
            <Text color="gray.600" mb={1}>
              Total
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              69.5h
            </Text>
          </Box>

          {/* Progress Bars */}
          <Stack flex={1} spacing={6}>
            {/* Academic Progress */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Box boxSize={3} rounded="full" bg="blue.500" mr={2} />
                  <Text>Academic</Text>
                </Flex>
                <Text fontWeight="medium">47%</Text>
              </Flex>
              <Progress value={47} size="sm" colorScheme="blue" rounded="full" />
            </Box>

            {/* Exercise Progress */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Box boxSize={3} rounded="full" bg="green.500" mr={2} />
                  <Text>Exercise</Text>
                </Flex>
                <Text fontWeight="medium">40%</Text>
              </Flex>
              <Progress value={40} size="sm" colorScheme="green" rounded="full" />
            </Box>

            {/* Personal Progress */}
            <Box>
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Box boxSize={3} rounded="full" bg="yellow.500" mr={2} />
                  <Text>Personal/Other</Text>
                </Flex>
                <Text fontWeight="medium">13%</Text>
              </Flex>
              <Progress value={13} size="sm" colorScheme="yellow" rounded="full" />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
