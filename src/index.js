import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import client from './graphql/client';
import theme from './theme';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthProvider from './auth';

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </MuiThemeProvider>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('root')
);
