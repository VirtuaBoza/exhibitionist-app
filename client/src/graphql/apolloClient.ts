import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";
import { /* proxyDomain, */ proxyUrl } from "../environment";
import { key } from "../hooks/useAuth";

export default new ApolloClient({
  link: ApolloLink.from([
    setContext((_, { headers }) => {
      const token = localStorage.getItem(key);
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    // split(
    //   ({ query }) => {
    //     const definition = getMainDefinition(query);
    //     return (
    //       definition.kind === "OperationDefinition" &&
    //       definition.operation === "subscription"
    //     );
    //   },
    //   new WebSocketLink({
    //     uri: `ws://${proxyDomain}/graphql`,
    //     options: {
    //       reconnect: true,
    //     },
    //   }),
    new HttpLink({
      uri: `${proxyUrl}/graphql`,
    }),
    // ),
  ]),
  cache: new InMemoryCache(),
});
