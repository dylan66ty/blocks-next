const path = require('path')
const process = require('process')
const { exec } = require('child_process')
const fs = require('fs-extra')
const glob = require('glob')
const consola = require('consola')
const { getIconVue, getIndexTs } = require('./template')
const { toCamelCase, toUpperFirstChar } = require('./utils')

const output = path.join(`${process.cwd()}/packages/components/icon`)
const svgSourceCwd = path.join(`${process.cwd()}/packages/svgs`)

const maps = {
  base: '基础图标',
  menu: '菜单图标'
}

const formatComponentName = (name) => {
  return toUpperFirstChar(toCamelCase(name.startsWith('bn-icon') ? name : `bn-icon-${name}`))
}

const getSVGData = () => {
  const data = []
  for (const dir of Object.keys(maps)) {
    const iconData = {
      title: maps[dir],
      dir,
      list: []
    }
    const files = glob.sync(`${dir}/**/*.svg`, {
      cwd: svgSourceCwd,
      absolute: true
    })
    for (const filePath of files) {
      const name = `${path.basename(filePath, '.svg')}`
      iconData.list.push({
        filename: name,
        componentName: formatComponentName(name),
        path: filePath
      })
    }
    data.push(iconData)
  }

  return data
}

const clear = async () => {
  await fs.emptyDir(output)
}

const buildIconComponent = async (svgData) => {
  const promises = []
  for (const svg of svgData) {
    for (const item of svg.list) {
      const svgHtml = fs.readFileSync(item.path, 'utf8')
      const iconHtml = getIconVue({
        componentName: item.componentName,
        svgHtml: svgHtml
      })
      const promise = fs
        .outputFile(path.resolve(output, svg.dir, `${item.filename}.vue`), iconHtml)
        .then(() => {
          consola.success(`Build ${item.componentName} Success!`)
        })
        .catch((err) => {
          consola.error(`Build ${item.componentName} Failed: ${err}`)
        })
      promises.push(promise)
    }
  }
  await Promise.all(promises)
}

const buildIndex = async (svgData) => {
  const imports = []
  const components = []

  for (const svg of svgData) {
    for (const item of svg.list) {
      components.push(item.componentName)
      imports.push(`import ${item.componentName} from './${svg.dir}/${item.filename}.vue'`)
    }
  }

  const vue = getIndexTs({
    imports,
    components
  })
  await fs
    .outputFile(path.resolve(output, 'index.ts'), vue)
    .then(() => {
      consola.success(`Build index.ts Success!`)
    })
    .catch(() => {
      consola.error(`Build index.ts Failed!`)
    })
}

const buildJson = async (svgData) => {
  const collect = {}
  for (const svg of svgData) {
    const target = (collect[svg.dir] = {
      label: maps[svg.dir],
      filenames: []
    })
    for (const item of svg.list) {
      target.filenames.push(item.filename)
    }
  }
  await fs
    .outputFile(path.resolve(output, 'icon.json'), JSON.stringify(collect, null, 2))
    .then(() => {
      consola.success(`Build icon.json Success!`)
    })
    .catch(() => {
      consola.error(`Build icon.json Failed!`)
    })
}

const lint = () => {
  consola.info(`eslint fix ${output}`)
  exec(`eslint ${output} --fix`)
  consola.success(`eslint fix Success!`)
}

const icongen = async () => {
  await clear()
  const svgData = getSVGData()
  await buildIconComponent(svgData)
  await buildIndex(svgData)
  await buildJson(svgData)
  lint()
}

icongen()
