import { split, ApolloLink, ApolloClient, concat, InMemoryCache, HttpLink } from '@apollo/client';

import { getMainDefinition } from 'apollo-utilities';
import withApollo from 'next-with-apollo';

import fetch from 'isomorphic-unfetch';
// import { WebSocketLink } from 'apollo-link-ws';
import Cookies from 'js-cookie';

let l = {} as any;
if (typeof window !== 'undefined') {
  l = window.location;
}
const port = l.port ? `:${l.port}` : '';
const SERVER_URL = l.hostname ? `${l.hostname}${port}` : process.env.SERVER_URL;

// should we use https/wss (production, staging) or http/ws (local dev)
const secureProtocol = process.browser && !(new RegExp('localhost')).test(SERVER_URL) ? 's' : '';
// const SERVER = `${l.protocol || 'http'}://${SERVER_URL}/graphql`;
const SERVER = `http${secureProtocol}://${SERVER_URL}/graphql`;
const WEB_SOCKET_LINK = `ws${secureProtocol}://${SERVER_URL}/graphql`;

interface Definintion {
  kind: string;
  operation?: string;
}

let authToken = null;
if (process.browser){
  const token = localStorage.getItem('token');
  if(token){
    authToken = `Bearer ${token}`;
  }
}

const httpLink = new HttpLink({
  fetch,
  uri: SERVER,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: authToken || null,
    },
  });
  // Add onto payload for WebSocket authentication
  (operation as any & { authToken: string | undefined }).authToken = authToken;

  return forward(operation);
});

// const webSocketLink: any = process.browser
//   ? new WebSocketLink({
//     uri: WEB_SOCKET_LINK,
//     options: {
//       reconnect: true,
//     },
//   })
//   : null;

/**
 * Set Token
 *
 * @param token
 */
export const setToken = async (token: string) => {
  try {
    authToken = token ? `Bearer ${token}` : null;
    Cookies.set('token', authToken, { expires: 7 });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Set Token In Request
 *
 * @param token
 */
export const setTokenInRequest = async (token: string) => {
  try {
    authToken = token ? token : null;
    return authToken;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Destroy Token
 * For logout purpose
 */
export const destroyToken = async () => {
  try {
    Cookies.remove('token');
    authToken = null;
  } catch (error) {
    console.log(error);
  }
};

const link = httpLink;

// const link = process.browser
//   ? split(
//     ({ query }) => {
//       const { kind, operation }: Definintion = getMainDefinition(query);
//       return kind === 'OperationDefinition' && operation === 'subscription';
//     },
//     webSocketLink,
//     httpLink
//   )
//   : httpLink;

export default withApollo(
  ({ initialState, ctx, headers }) => {
    return new ApolloClient({
      link: concat(authMiddleware, link),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  }
);