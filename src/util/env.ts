export const mustGetEnv = (key: string) => {
  const envData = process.env[key];
  if (!envData) throw new Error(`${key} not in env`);
  return envData;
};
