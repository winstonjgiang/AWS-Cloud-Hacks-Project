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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";

export default function ChakraNav({ auth, page, setPage, isAuthenticated, setIsAuthenticated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor    = useColorModeValue("white", "gray.800");
  const activeBg   = useColorModeValue("gray.200", "gray.700");
  const hoverBg    = useColorModeValue("gray.200", "gray.700");

  const navItems = [
    { label: "Home",      action: () => setPage("home"),      key: "home" },
  ];
  if (auth.isAuthenticated && isAuthenticated) {
    navItems.push(
      { label: "Dashboard", action: () => setPage("dashboard"), key: "dashboard" }
    );
  }

  return (
    <Box bg={bgColor} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Mobile menu toggle */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        {/* Logo + desktop nav */}
        <HStack spacing={8} alignItems="center">
          <Logo className="w-20 h-16" />
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <ChakraLink
                key={item.key}
                onClick={item.action}
                cursor="pointer"
                px={2}
                py={1}
                rounded="md"
                bg={page === item.key ? activeBg : "transparent"}
                _hover={{ textDecoration: "none", bg: hoverBg }}
              >
                {item.label}
              </ChakraLink>
            ))}
          </HStack>
        </HStack>

        {/* User menu (when signed in) */}
        <Flex alignItems="center">
          {(auth.isAuthenticated && isAuthenticated) && (
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