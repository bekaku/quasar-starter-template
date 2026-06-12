export const useAppConfig = () => {

  const isProduction = () => {
    return import.meta.env.NODE_ENV === 'production';
  }
  const isServer = () => {
    return import.meta.env.QUASAR_SERVER;
  }
  return {
    isProduction,
    isServer
  };
};
