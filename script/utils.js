const child_process = require('child_process')
const consola = require('consola')
const chalk = require('chalk')

const promiseDefer = () => {
  let _resolve
  let _reject
  let _promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })
  return {
    resolve: _resolve,
    reject: _reject,
    promise: _promise
  }
}

const to = (promiser) => promiser.then((val) => [null, val]).catch((err) => [err, null])

const sleep = (delay = 0) => {
  const { promise, resolve } = promiseDefer()
  setTimeout(resolve, delay)
  return promise
}

const composeSync = (...fns) =>
  fns.reduce(
    (a, v) =>
      (...args) =>
        a(v(...args))
  )

const composeAsync = (...fns) =>
  fns.reduce(
    (a, v) =>
      async (...args) =>
        a(await v(...args))
  )

const log = {
  output(text) {
    console.log(`${chalk.blue('->')} ${text}`)
  },
  success(text) {
    consola.success(chalk.green(text))
  },
  error(text) {
    consola.error(text)
  }
}

/**
 *
 * @param {sting} cmd
 * @param {array} args
 * @param {import('child_process').SpawnOptions} options
 * @returns
 */
const spawn = (cmd, args, options) => {
  const { promise, resolve, reject } = promiseDefer()
  const child = child_process.spawn(cmd, args, options)

  let outStr
  if (child.stdout) {
    const out = []
    child.stdout.on('data', (buffer) => {
      out.push(buffer)
    })

    child.stdout.on('end', () => {
      outStr = Buffer.concat(out).toString('utf-8')
    })
  }

  let errStr = ''
  if (child.stderr) {
    const err = []
    child.stderr.on('data', (buffer) => {
      err.push(buffer)
    })

    child.stderr.on('end', () => {
      errStr = Buffer.concat(err).toString('utf-8')
    })
  }

  child.on('close', () => {
    const ret = outStr || errStr
    resolve(ret)
  })

  child.on('error', (err) => {
    reject(err)
  })
  return promise
}

module.exports = {
  promiseDefer,
  to,
  composeAsync,
  composeSync,
  sleep,
  log,
  spawn
}
