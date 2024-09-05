
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame

window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame

let reqInt = -1
let funcArr = []

/**
 * @example
 * import RenderUtil from '@/js/utils/RenderUtil'
 * RenderUtil.add(renderFunction)
 */
export default class RenderUtil
{
  static isStarted = false

  static add(func)
  {
    if(!funcArr.includes(func)) funcArr.push(func)

    RenderUtil.start()
  }

  static remove(func)
  {
    let index = funcArr.indexOf(func)
    if(index != -1) funcArr.splice(index, 1)

    if(funcArr.length === 0) RenderUtil.stop()
  }

  static start()
  {
    if(this.isStarted) return
    this.isStarted = true

    RenderUtil.animate()
  }

  static animate()
  {
    reqInt = window.requestAnimationFrame(RenderUtil.animate)


    let len = funcArr.length
    if(len === 0) RenderUtil.stop()

    for(let i = 0; i < funcArr.length; i++) funcArr[i]()
  }

  static stop()
  {
    this.isStarted = false
    window.cancelAnimationFrame(reqInt)
  }
}