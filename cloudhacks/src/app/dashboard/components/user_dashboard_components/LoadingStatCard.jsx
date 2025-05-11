// components/LoadingStatCard.jsx
import {
    Card,
    CardBody,
    Flex,
    Skeleton,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  export default function LoadingStatCard() {
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");

  
    return (
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
  }