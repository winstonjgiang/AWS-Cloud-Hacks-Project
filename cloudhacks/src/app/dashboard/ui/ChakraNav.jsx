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
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Logo from "./Logo";

const NavLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function ChakraNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("white", "gray.800")} px={4} boxShadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
        <Logo className="w-20 h-16" />
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {NavLinks.map((link) => (
              <ChakraLink
                key={link.href}
                as={Link}
                px={2}
                py={1}
                rounded="md"
                _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}
                href={link.href}
              >
                {link.label}
              </ChakraLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar size="sm" src="https://bit.ly/broken-link" />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {NavLinks.map((link) => (
              <ChakraLink
                key={link.href}
                as={Link}
                px={2}
                py={1}
                rounded="md"
                _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}
                href={link.href}
              >
                {link.label}
              </ChakraLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}