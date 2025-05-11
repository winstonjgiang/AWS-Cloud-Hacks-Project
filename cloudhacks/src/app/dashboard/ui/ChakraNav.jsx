import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";

export default function ChakraNav({ auth, page, setPage, isAuthenticated, setIsAuthenticated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const activeBg = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const activeTextColor = useColorModeValue("gray.800", "white");
  const accentColor = "#FF9900"; // AWS Orange

  const navItems = [
    { label: "Home", action: () => setPage("home"), key: "home" },
  ];
  
  if (auth.isAuthenticated && isAuthenticated) {
    navItems.push(
      { label: "Dashboard", action: () => setPage("dashboard"), key: "dashboard" }
    );
  }

  return (
    <Box bg={bgColor} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">

        {/* Logo + desktop nav */}
        <HStack spacing={8} alignItems="center">
          <HStack spacing={2} alignItems="center">
            <Logo className="w-20 h-16" />
            <Text
              fontSize="24px"
              fontWeight="bold"
              bgGradient="linear(to-r, gray.800, #FF9900)"
              bgClip="text"
              letterSpacing="tight"
            >
              RateMyCalendar
            </Text>
          </HStack>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <ChakraLink
                key={item.key}
                onClick={item.action}
                cursor="pointer"
                px={4}
                py={2}
                rounded="md"
                fontSize="md"
                fontWeight="500"
                color={page === item.key ? activeTextColor : textColor}
                bg={page === item.key ? activeBg : "transparent"}
                transition="all 0.2s"
                _hover={{
                  textDecoration: "none",
                  bg: hoverBg,
                  color: activeTextColor,
                  transform: "translateY(-1px)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                position="relative"
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: page === item.key ? "80%" : "0%",
                  height: "2px",
                  bg: accentColor,
                  transition: "all 0.2s",
                }}
                _hover={{
                  _after: {
                    width: "80%",
                  },
                }}
              >
                {item.label}
              </ChakraLink>
            ))}
          </HStack>
        </HStack>

        {/* User menu (when signed in) */}
        <Flex alignItems="center">
          {auth.isAuthenticated && isAuthenticated && (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src="https://bit.ly/broken-link" />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    console.log("Signing out");
                    setPage("home");
                    setIsAuthenticated(false);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}