import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_HASURA_URI,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_KEY,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://on-firefly-85.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_KEY,
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
