import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Router from "./router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles/layout.scss";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

const element = document.getElementById("root")

if (element === null) {
    throw new Error('must define root element')
}

const root = ReactDOM.createRoot(element);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    </React.StrictMode>
);

reportWebVitals();
