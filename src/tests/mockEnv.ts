const mockEnv = (env = {}) => {
  const processEnv = process.env;

  beforeEach(() => {
    process.env = { ...processEnv, ...env };
  });

  afterEach(() => {
    process.env = processEnv;
  });
};

export { mockEnv };
