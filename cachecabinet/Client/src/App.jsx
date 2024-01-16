// App.js
import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer ' + token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <section
        id='topLevel'
        className='content section'>
        <Outlet />
      </section>
      <Footer />
    </ApolloProvider>
  );
}

export default App;

