const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')

const npmPublish = require('./publish/npm')
const docPublish = require('./publish/docs')
const notice_qw = require('./notice/qw')

const { composeAsync, log, spawn } = require('./utils')

const prompt = inquirer.createPromptModule()

prompt({
  type: 'checkbox',
  message: 'Select tasks',
  name: 'tasks',
  choices: [
    { name: '打包组件库', value: 'build:components' },
    { name: '打包文档', value: 'build:docs' },
    { name: '发布组件库', value: 'publish:components' },
    { name: '发布文档', value: 'publish:docs' },
    { name: '通知到企业微信群', value: 'notice:qw' }
  ]
})
  .then((answers) => {
    execTasks(answers.tasks)
  })
  .catch((error) => console.error(error))

const cwd = process.cwd()

const step = () => {
  let spinner
  return {
    start(startText) {
      spinner = ora(`${chalk.blue(startText)}`).start()
      return this
    },
    end(endText) {
      spinner.clear()
      log.success(endText)
      spinner.stop()
    }
  }
}

const cmdMap = {
  'build:components': () => {
    return composeAsync(
      async () => {
        const S = step().start('Building components')
        await spawn('npm', ['run', 'build'], { cwd })
        S.end('Building components successfully!')
      },
      async () => {
        await spawn('npm', ['run', 'release'], { cwd, stdio: 'inherit' })
        log.success('Change version successfully!')
      }
    )()
  },
  'build:docs': async () => {
    const S = step().start('Building docs')
    await spawn('npm', ['run', 'docs:build'], { cwd })
    S.end('Building docs successfully!')
  },
  'publish:components': async () => {
    const S = step().start('Publish components')
    await npmPublish()
    S.end('Publish component successfully!')
  },
  'publish:docs': async () => {
    const S = step().start('Publish docs')
    await docPublish()
    S.end('Publish docs successfully!')
  },
  'notice:qw': async () => {
    const S = step().start('Notification 企业微信群')
    await notice_qw()
    S.end('Notification 企业微信群 successfully!')
  }
}

const execTasks = async (tasks = []) => {
  if (tasks.length === 0) process.exit(1)

  const taskFns = tasks.reverse().map((cmd) => () => cmdMap[cmd]())

  composeAsync(...taskFns, async () => {
    const exist = await fs.exists(path.resolve(process.cwd(), '.publish.env'))
    if (!exist) throw '项目根目录缺少 .publish.env 文件'
  })().catch((err) => {
    log.error(err)
    process.exit(1)
  })
}
