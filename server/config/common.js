import * as yup from 'yup';

const envVarsSchema = yup
  .object({
    NODE_ENV: yup
      .string()
      .oneOf(['development', 'production', 'test'])
      .required(),
  })
  .required();

const config = () => {
  let envVars;
  try {
    envVars = envVarsSchema.validateSync(process.env, { stripUnknown: true });
  } catch (error) {
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }
  return {
    env: envVars.NODE_ENV,
  };
};

export default config;
