import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  gql,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const httpLink = new HttpLink({
  uri: 'https://creative-dane-85.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'sOz6nXnWQozNUeAhyRE9aqfEy3dnyJdFLtwjYuXmuFShou4yIzq1vmq7DOMcEfNn',
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://creative-dane-85.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':
          'sOz6nXnWQozNUeAhyRE9aqfEy3dnyJdFLtwjYuXmuFShou4yIzq1vmq7DOMcEfNn',
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
