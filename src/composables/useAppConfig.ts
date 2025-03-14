export const useAppConfig = () => {
  const getConfig = <T>(key: string) => {
    const config = process.env[key];
    if (config) {
      return config as T;
    }
    return undefined;
  }
  const isProduction = () => {
    return process.env.NODE_ENV === 'production';
  }
  const isServer = () => {
    return process.env.SERVER;
  }
  return {
    getConfig,
    isProduction,
    isServer
  };
};
