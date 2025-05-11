import { Button as ChakraButton } from "@chakra-ui/react";
export default function Button({ auth }) {
  return (
    <ChakraButton
      onClick={() => auth.signinRedirect()}
      disabled={auth.isAuthenticated}
      bg="#FF9900"
      _hover={{ bg: "#E68A00" }}
    >
      Sign in
    </ChakraButton>
  );
}
