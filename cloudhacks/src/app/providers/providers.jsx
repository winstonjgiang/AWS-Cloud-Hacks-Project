'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'react-oidc-context';
import theme from '../theme';

const cognitoAuthConfig = {
  authority: process.env.NEXT_PUBLIC_OIDC_AUTHORITY,
  client_id: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_OIDC_REDIRECT_URI,
  response_type: process.env.NEXT_PUBLIC_OIDC_RESPONSE_TYPE,
  scope: process.env.NEXT_PUBLIC_OIDC_SCOPE,
};

export function Providers({ children }) {
  return (
    <AuthProvider {...cognitoAuthConfig}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </AuthProvider>
  );
}