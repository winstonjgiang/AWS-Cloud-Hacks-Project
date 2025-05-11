// components/StatCard.jsx
import {
    Card,
    CardBody,
    Flex,
    Icon,
    Text,
    Progress,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  export default function StatCard({ stat }) {
    const cardBg = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
  
    // Destructure
    const { title, value, progress, icon: IconComp, color } = stat;
  
    return (
      <Card bg={cardBg} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
        <CardBody>
          {title === "Total Time" ? (
            <Flex direction="column" height="100%" justify="center" align="center" textAlign="center" py={2}>
              <Flex align="center" mb={3}>
                <Icon as={IconComp} color={color} boxSize={7} mr={2} />
                <Text color="gray.500" fontSize="lg">{title}</Text>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold" color="black">
                {value.toFixed(1)} hours
              </Text>
              <Text fontSize="sm" color="gray.500" mt={1}>
                spent this week on events
              </Text>
            </Flex>
          ) : (
            <>
              <Flex align="center" mb={2}>
                <Icon as={IconComp} color={color} boxSize={6} mr={2} />
                <Text color="gray.500">{title}</Text>
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                {value.toFixed(1)} hours
              </Text>
              <Progress
                value={progress}
                size="sm"
                colorScheme={color.split(".")[0]}
                borderRadius="full"
              />
              <Text fontSize="sm" color="gray.500" mt={2}>
                {progress}% of your weekly time spent
              </Text>
            </>
          )}
        </CardBody>
      </Card>
    );
  }