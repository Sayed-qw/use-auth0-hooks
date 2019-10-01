import App from 'next/app';
import Router from 'next/router';
import { Auth0Provider } from 'use-auth0-hooks';

import Layout from '../components/layout';

/**
 * Where to send the user after they have signed in.
 */
const onRedirectCallback = appState => {
  if (appState && appState.returnTo) {
    Router.push({
      pathname: appState.returnTo.pathname,
      query: appState.returnTo.query
    })
  }
};

/**
 * When signing in fails for some reason, we want to show it here.
 * @param {Error} err 
 */
const onError = (err) => {
  Router.push({
    pathname: '/oops',
    query: {
      message: err.error_description || err.message
    }
  })
};

/**
 * When redirecting to the login page you'll end up in this state where the login page is still loading.
 * You can render a message to show that the user is being redirected.
 */
const onRedirecting = () => {
  return (
    <div>
      <h1>Signing you in</h1>
      <p>
        In order to access this page you will need to sign in.
        Please wait while we redirect you to the login page...
      </p>
    </div>
  );
};

/**
 * Create a page which wraps the Auth0 provider.
 */
export default class Root extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Auth0Provider
        domain={'sandrino-dev.auth0.com'}
        clientId={'9f6ClmBt37ZGCXNqToPbefKmzVBSOLa2'}
        redirectUri={'http://localhost:3000/'}
        onError={onError}
        onRedirecting={onRedirecting}
        onRedirectCallback={onRedirectCallback}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </Auth0Provider>
    );
  }
}
