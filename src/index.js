import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./graphql/link";
import Paginator from "./Paginator";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

render(
  <ApolloProvider client={client}>
    <Paginator />
  </ApolloProvider>,
  document.getElementById("root")
);
