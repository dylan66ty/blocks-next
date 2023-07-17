const options = {
  plugins: [
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
        attrs: ['class', 'style', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']
      }
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: []
      }
    }
  ]
}

module.exports = options
