/**
 * @example
 * import _ from '@/js/utils/Util'
 * _.r(0,100)
 * _.show(element)
 */

export default class Util
{
  static responsiveSize(val1, actualW, baseW)
  {
    return val1 * actualW / baseW
  }

  static addEngClass(target)
  {
    // 半角英数記号にspanタグを付与
    const replaceTxt = target.textContent.replace(/[a-zA-Z0-9!-/:-@¥[-`{-~]/g,'<span class="u-en">$&</span>');
    target.innerHTML = replaceTxt
  }

  static getInvertedColor(hexColor)
  {
    // 指定した色からR/G/Bをそれぞれ取得
    const red   = parseInt(hexColor.substr(1, 2), 16)
    const green = parseInt(hexColor.substr(3, 2), 16)
    const blue  = parseInt(hexColor.substr(5, 2), 16)
    
    // 明るさの計算(0〜255)
    const brightness = ( red * 299 + green * 587 + blue * 114 ) / 1000
    // 明るさの計算(0〜100)
    const luminance = brightness / 2.55
    
    // 基準値(50)より大きい場合は、dark、それ以外はlightを返す
    return luminance > 50 ? "-dark" : "-light"
  }

  static RAD = Math.PI / 180 //.017453293
  static rad(val) { return val * .017453293 }
  static r(min, max) { return Math.random() * (max - min) + min }

  // static remove(el)
  // {
  //   if(!el) return
  //   if(el._btn) el._btn.reset()
  //   el = null
  // }
  
  static el(id)
  {
    let el = document.getElementById(id)
    if(!el) el = null
    return el
  }
  
  static find(el, selector)
  {
    if(!el) return
    return Array.from(el.querySelectorAll(selector))
  }
  static findAll = this.find

  static find1st(el, selector)
  {
    if(!el) return
    return el.querySelector(selector)
  }

  // static children(el)
  // {
  //   if(!el) return
  //   return Array.from(el.children)
  // }

  static selector(c)
  {
    return document.querySelector(c)
  }

  static selectorAll(c)
  {
    return Array.from(document.querySelectorAll(c))
  }
  
  static dispose(el)
  {
    if(!el) return
    while(el.firstChild) el.removeChild(el.firstChild)
    el.remove()
  }
  
  /**
   * [static] addClass
   * classを追加します
   *
   * @param element:object
   * @param className:string
   */
  static addClass(el, className)
  {
    if(!el) return
    el.classList.add(className)
  }

  /**
   * [static] removeClass
   * classを削除します
   *
   * @param element:object
   * @param className:string
   */
  static removeClass(el, className)
  {
    if(!el) return
    el.classList.remove(className)
  }

  /**
   * [static] hasClass
   * classを持っているか判別
   *
   * @param element:object
   * @param className:string
   */
  static hasClass(el, className)
  {
    if(!el) return
    return el.classList.contains(className)
  }

  /**
   * [static] toggleClass
   *
   * @param element:object
   * @param className:string
   */
  // static toggleClass(el, className)
  // {
  //   if(!el) return
  //   if(el.classList) el.classList.toggle(className)
  // }

  static getPageSize()
  {
    let obj = {}
    obj.sx = document.documentElement.scrollLeft || document.body.scrollLeft
    obj.sy = document.documentElement.scrollTop  || document.body.scrollTop

    obj.ww = document.documentElement.clientWidth  || document.body.clientWidth  || document.body.scrollWidth
    obj.wh = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight

    obj.dw = document.documentElement.scrollWidth  || document.body.scrollWidth
    obj.dh = document.documentElement.scrollHeight || document.body.scrollHeight

    return obj
  }

  // static getRelativePosition(target)
  // {
  //   return { x: target.offsetLeft, y: target.offsetTop }
  // }

  static getPosition(target)
  {
    let rect = target.getBoundingClientRect()
    let positionX = rect.left
    let positionY = rect.top

    let dElm = document.documentElement, dBody = document.body
    let scrollX = dElm.scrollLeft || dBody.scrollLeft
    let scrollY = dElm.scrollTop || dBody.scrollTop
    let x = positionX + scrollX >> 0
    let y = positionY + scrollY >> 0
    // t( "x:" + x + "px , y:" + y + "px" )

    return { x: x, y: y }
  }

  static getRect(el)
  {
    let rect = Util.getPosition(el)
    rect.width = el.offsetWidth
    rect.height = el.offsetHeight
    return rect
  }

  static getW(el)
  {
    if(!el) return
    // offsetWidth : width + padding + border
    // clientWidth : width + padding
    return el.offsetWidth
  }

  static getH(el)
  {
    if(!el) return
    return el.offsetHeight
  }

  static delayedCall(func, wait)
  {
    let int = setTimeout(func, wait * 1000)
    return int
  }

  static killDelayedCall(int)
  {
    clearTimeout(int)
  }

  /**
   * [sortObjectArray] 複製せず配列そのものをソート
   * @param  {[type]} data  array
   * @param  {[type]} key   value
   * @param  {[type]} order asc or desc
   * @return {[type]}       sorted array
   */
  // static sortObjectArray(arr, key, order)
  // {
  //  //デフォルトでは降順(DESC)
  //  let num_a = -1
  //  let num_b = 1

  //  if(order === 'asc')
  //  {
  //    //指定があれば昇順(ASC)
  //    num_a = 1
  //    num_b = -1
  //  }

  //  arr = arr.sort(function(a, b)
  //  {
  //    let x = a[key]
  //    let y = b[key]
  //    if (x > y) return num_a
  //    if (x < y) return num_b
  //    return 0
  //  })
  // }
  
  static shuffle(arr)
  {
    let i, j, temp
    arr = arr.slice()
    i = arr.length
    if(i === 0)
    {
      return arr
    }
    while(--i)
    {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }
}
