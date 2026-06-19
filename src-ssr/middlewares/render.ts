import { defineSsrMiddleware } from '#q-app';
import type {
  SsrRenderRedirectError,
  SsrRenderRouteNotFoundError
} from '#q-app';

function isRedirectError(err: unknown): err is SsrRenderRedirectError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'redirectUrl' in err &&
    'redirectHttpStatusCode' in err
  );
}

function isRouteNotFoundError(
  err: unknown
): err is SsrRenderRouteNotFoundError {
  return typeof err === 'object' && err !== null && 'routeNotFound' in err;
}

/**
 * This middleware should execute as last one
 * since it captures everything and tries to
 * render the page with Vue
 */
export default defineSsrMiddleware(({ app, resolve, render, serve }) => {
  /**
   * We capture any other Express route and hand it
   * over to Vue and Vue Router to render our page
   */
  app.get(resolve.urlPath('{*path}'), async (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    try {
      const renderedHtml = await render({ req, res });
      res.send(renderedHtml);
    } catch (err) {
      if (isRouteNotFoundError(err)) {
        /**
         * Hmm, Vue Router could not find the requested route
         * and it does not have a "catch-all" route
         */
        res.status(404).send('404 | Page Not Found');
        return;
      }

      if (isRedirectError(err)) {
        /**
         * We were told to redirect to another URL
         */
        res.redirect(err.redirectHttpStatusCode, err.redirectUrl);
        return;
      }

      if (import.meta.env.QUASAR_DEV) {
        /**
         * Well, we treat any other code as error;
         * if we're in dev mode, then we can use Quasar CLI
         * to display a nice error page that contains the stack
         * and other useful information
         *
         * Note that serve.devError is available on dev only
         */
        const { errorHeaders, errorHtml } = serve.devError({ err, req });
        res.set(errorHeaders).status(500).send(errorHtml);
        return;
      }

      if (import.meta.env.QUASAR_DEBUG) {
        console.error(
          err instanceof Error ? err.stack : (err ?? 'Unknown error')
        );
      }

      /**
       * Render Error Page on production or
       * alternatively, create a route (/src/routes) for an error page and redirect to it
       * (just make sure that route won't crash too, otherwise you'll end up in an infinite loop!)
       */
      res.status(500).send('500 | Internal Server Error');
    }
  });
});
