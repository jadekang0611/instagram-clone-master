import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';

const headers = {
  'x-hasura-admin-secret':
    'sOz6nXnWQozNUeAhyRE9aqfEy3dnyJdFLtwjYuXmuFShou4yIzq1vmq7DOMcEfNn',
};

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://creative-dane-85.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
