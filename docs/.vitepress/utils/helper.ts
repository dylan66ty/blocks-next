export const copyStr = (content:string):Promise<any> => {
  return new Promise((resolve,reject) => {
    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.style.cssText += 'position:fixed;top:-10000px;left:-10000px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
  
    if(document.execCommand) {
     document.execCommand('copy')
     resolve('ok')
    }else {
      reject(null)
    }
    document.body.removeChild(textarea)
    
  })

}
