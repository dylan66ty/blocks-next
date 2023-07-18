const plugins = [
  {
    name: 'preset-default',
    params: {
      overrides: {
        removeViewBox: false
      }
    }
  },
  'removeStyleElement',
  'removeScriptElement',
  'removeDimensions',
  {
    name: 'removeAttrs',
    params: {
      attrs: ['class', 'style']
    }
  },
  {
    name: 'addAttributesToSVGElement',
    params: {
      attributes: []
    }
  }
]

/**
 * @type {import('svgo').Config}
 */
const options = {
  plugins
}

module.exports = options
