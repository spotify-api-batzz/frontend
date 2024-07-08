export const mustGetEnv = (key: string) => {
  const envData = import.meta.env[key];
  if (!envData) throw new Error(`${key} not in env`);
  return envData;
};

export const getEnv = (key: string) => {
  const envData = import.meta.env[key];
  return envData;
};
