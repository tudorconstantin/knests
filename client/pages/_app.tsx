import { AppProps } from 'next/app';
import React, { Component } from 'react';
import { useRouter } from 'next/router';

// import Chart from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import validate from 'validate.js';

import { chartjs } from '../helpers';
import theme from '../theme';

import validators from '../common/validators';

import { ApolloProvider } from '@apollo/client';
import withApollo from '../helpers/configureGraphQL';

import jwtDecode from 'jwt-decode';

// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw
// });

validate.validators = {
  ...validate.validators,
  ...validators,
};

function canVisit(path): boolean {
  const whitelistedPaths = [
    new RegExp('^/login', 'i'),
    new RegExp('^/signup', 'i'),
  ];
  for (const allow of whitelistedPaths) {
    if (allow.test(path)) return true;
  }

  const token = localStorage.getItem('token');
  if (!(token && token.length)) {
    return false;
  }
  const decodedToken = jwtDecode(token);

  return true;
}

function MyApp(props) {
  const { Component, pageProps, apollo } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (process.browser) {
    const router = useRouter();
    if (!canVisit(router.pathname)) {
      router.push('/login');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apollo}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} client={apollo} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withApollo(MyApp);
