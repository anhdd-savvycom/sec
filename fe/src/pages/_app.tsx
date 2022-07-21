import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    if (!client) {
      const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_BE_URI,
      });

      // Create a WebSocket link:
      const wsLink = new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS_URI || '',
        options: {
          reconnect: true,
        },
      });

      // using the ability to split links, you can send data to each link
      // depending on what kind of operation is being sent
      const link = split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      );

      // Create an http link:
      setClient(new ApolloClient({
        uri: process.env.NEXT_PUBLIC_BE_URI,
        cache: new InMemoryCache(),
        link: link as unknown as ApolloLink,
      }));
    }
  }, [client]);

  return (
    <>
      {client && (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      )}
    </>
  );
}

export default MyApp
