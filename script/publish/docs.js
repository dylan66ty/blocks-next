const path = require('path')
const ftp = require('basic-ftp')
const config = require('../config')

async function uploadDocs() {
  const client = new ftp.Client()
  const localPath = path.resolve(process.cwd(), config.DOC_PKG_DIST_PATH)
  client.ftp.verbose = true
  try {
    await client.access({
      host: config.HOST,
      user: config.USER,
      password: config.PWD,
      port: 21
    })
    await client.ensureDir('docs')
    await client.clearWorkingDir()
    await client.uploadFromDir(localPath)
  } catch (err) {
    throw `${config.HOST}连接: ${err.message}`
  }
  client.close()
}

module.exports = uploadDocs
