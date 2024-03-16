import { ApolloClient, InMemoryCache } from '@apollo/client';

// 初始化Apollp
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
