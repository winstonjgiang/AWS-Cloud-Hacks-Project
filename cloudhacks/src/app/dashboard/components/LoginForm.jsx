// src/LoginForm.jsx
import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import CalendarStatsDemo from './Demo'
import DashboardMetrics from './DashboardMetrics'

export default function LoginForm({ auth }) {
  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const headingColor = useColorModeValue('gray.800', 'white')


  return (
    <Flex
      minH="100vh"
      bg={bg}
      align="center"
      justify="center"
      p={4}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        bg={cardBg}
        boxShadow="lg"
        borderRadius="xl"
        overflow="hidden"
        maxW="100%"
        w="full"
      >
        {/* Left panel */}
        <Box flex="1" display="flex" alignItems="center" p={{ base: 6, md: 10 }} w={{ base: '100%', md: '40%' }} maxW={{ md: '45%' }}>
          <Stack spacing={4}>
            <Heading as="h1" size="2xl" color={headingColor} lineHeight="1.2">
              Understand how{' '}
              <Text as="span" color="#FF9900" display="inline">
                you spend your time
              </Text>
            </Heading>
            <Text fontSize="lg" color="gray.600">
              CalendarStats transforms your calendar data into actionable insights.
              Track your time, identify patterns, and optimize your schedule.
            </Text>
            <Button
              size="lg"
              bg="#FF9900"
              color="white"
              w={{ base: 'full', sm: 'auto' }}
              onClick={() => auth.signinRedirect()}
              borderRadius="md"
              py={6}
            >
              Sign in with Google
            </Button>
          </Stack>
        </Box>

        {/* Right panel */}
        <Box
          flex="1"
          p={{ base: 0, md: 6 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={{ base: '100%', md: '55%' }}
          maxW={{ md: '55%' }}
        >
          <DashboardMetrics />
        </Box>
      </Flex>
    </Flex>
  )
}