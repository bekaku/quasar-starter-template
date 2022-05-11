export default ({ app, resolve }) => {
  app.all(resolve.urlPath('*'), (req, _, next) => {
    console.log('someone requested:', req.url);
    next();
  });
};
