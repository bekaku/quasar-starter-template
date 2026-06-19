export const useAppConfig = () => {
  const isProduction = () => {
    return import.meta.env.QUASAR_PROD;
  }
  const isServer = () => {
    return import.meta.env.QUASAR_SERVER;
  }
  return {
    isProduction,
    isServer
  };
};
