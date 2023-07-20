const path = require('path')
const process = require('process')
const ftp = require('basic-ftp')
const consola = require('consola')

const localPath = path.resolve(process.cwd(), 'docs/.vitepress/dist')

async function uploadDocs() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: '192.168.21.136',
      user: 'dingtuoyang',
      password: '123456',
      port: 21
    })
    await client.ensureDir('docs')
    await client.clearWorkingDir()
    await client.uploadFromDir(localPath)
  } catch (err) {
    consola.error(err)
  }

  client.close()

  consola.success('docs publish successfully!')
}

uploadDocs()
