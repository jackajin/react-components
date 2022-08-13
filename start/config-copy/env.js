const { RUN_INFO } = process.env;
const runInfo = RUN_INFO ? JSON.parse(RUN_INFO) : {};

module.exports = {
  ENV_MODE: runInfo.mode,
  ENV_DEVELOPMENT: runInfo.development,
};
