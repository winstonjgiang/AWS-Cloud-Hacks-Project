// components/SummarySection.jsx
import {
    Card,
    CardBody,
    Flex,
    Icon,
    Heading,
    Text,
    SkeletonText,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaClock } from "react-icons/fa";
  
  export default function SummarySection({ summary, isLoading }) {
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
  
    return (
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg" mb={8}>
        <CardBody>
          <Flex align="center" gap={3} mb={4}>
            <Icon as={FaClock} color="blue.400" boxSize={6} />
            <Heading size="sm">Weekly Summary</Heading>
          </Flex>
          {isLoading ? (
            <SkeletonText noOfLines={3} spacing="4" skeletonHeight="4" />
          ) : (
            <Text color="gray.600">{summary}</Text>
          )}
        </CardBody>
      </Card>
    );
  }