// components/DashboardHeader.jsx
import { Stack, Heading, Text, Box, useColorModeValue } from "@chakra-ui/react";

export default function DashboardHeader() {
  const titleColor = "#232F3E";
  const accentColor = "#FF9900";

  return (
    <Box mb={8}>
      <Stack spacing={3}>
        <Heading size="lg" color={titleColor}>
          User Dashboard
          <Text as="span" color={accentColor} ml={2}>
            Overview
          </Text>
        </Heading>
        <Text color="gray.500">Track your progress and manage your activities</Text>
      </Stack>
    </Box>
  );
}