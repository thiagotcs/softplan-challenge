import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'antd/dist/antd.css';
import App from './routes';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
