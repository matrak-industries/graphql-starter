import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "cross-fetch";

export default function (server: string, authorization: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: server,
      headers: {
        Authorization: authorization,
      },
      fetch
    }),
    cache: new InMemoryCache()
  });
}
