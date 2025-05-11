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
import CalendarStatsDemo from './dashboard/components/demo'

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
        maxW="5xl"
        w="full"
      >
        {/* Left panel */}
        <Box flex="1" p={{ base: 6, md: 10 }}>
          <Stack spacing={4}>
            <Heading as="h1" size="2xl" color={headingColor}>
              Understand how you spend your time
            </Heading>
            <Text fontSize="lg" color="gray.500">
              CalendarStats transforms your calendar data into actionable insights.
              Track your time, identify patterns, and optimize your schedule.
            </Text>
            <Button
              size="lg"
              colorScheme="teal"
              w={{ base: 'full', sm: 'auto' }}
              onClick={() => auth.signinRedirect()}
            >
              Sign in with Google
            </Button>
          </Stack>
        </Box>

        {/* Right panel */}
        <Box
          flex="1"
          bg={useColorModeValue('teal.50', 'teal.900')}
          p={{ base: 0, md: 6 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CalendarStatsDemo />
        </Box>
      </Flex>
    </Flex>
  )
}