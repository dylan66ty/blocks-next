const path = require('path')
const { composeAsync, spawn } = require('../utils')
const config = require('../config')

const publish = async () => {
  const env = {
    ...process.env,
    NPM_CONFIG_REGISTRY: config.MIRROR_URL
  }
  const cwd = path.resolve(process.cwd(), config.COMP_PKG_DIST_PATH)

  return composeAsync(
    async () => {
      const ret = await spawn('npm', ['publish'], {
        env,
        cwd
      })
      if (ret.includes('npm ERR!')) {
        throw 'npm ERROR: 发布异常'
      }
    },
    async () => {
      const username = await spawn('npm', ['whoami'], { env, cwd })
      if (username.includes('ENEEDAUTH')) {
        throw 'npm ERROR: 未登录npm账号'
      }
      if (!config.AUTH_USER_NAMES.includes(username.trim())) {
        throw 'npm ERROR: 你的npm账号无发布权限'
      }
    }
  )()
}

module.exports = composeAsync(publish)
