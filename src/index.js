import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'antd/dist/antd.css';
import './global-styles.css';
import App from './routes';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries-274616.ew.r.appspot.com',
  resolvers: {},
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
