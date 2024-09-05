/**
 * @example
 * import BrowserUtil from '@/js/utils/BrowserUtil'
 * let ua = BrowserUtil.getUserAgent()
 */
export default class BrowserUtil
{
  /**
  * [static] getUserAgent
  * UserAgentを取得します.
  */
  static getUserAgent()
  {
    const ua = navigator.userAgent
    if(ua.indexOf("iPhone") != -1) return "IPHONE"
    else if(ua.indexOf("Android") != -1) return "ANDROID"
    else if(ua.indexOf("iPad") != -1) return "IPAD"
    return "PC"
  }
  
  static isWebp()
  {
    let result = true
    if(this.getUserAgent() == "IPHONE")
    {
      if(this.getiOSVersion() < 14)
      {
        this.ext_jpg = "jpg"
        this.ext_png = "png"
        result = false
      }
    }
    
    return result
  }

  static getiOSVersion()
  {
    return parseFloat(
        ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
        .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    ) || false
  }

  static isSP()
  {
    const ua = navigator.userAgent
    if((ua.indexOf('iPhone') > -1 && ua.indexOf('iPad') === -1) || 
        ua.indexOf('iPod') > -1 || 
       (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)
    ) return true
    return false
  }

  static isTablet()
  {
    const ua = navigator.userAgent
    if(ua.indexOf('iPad') > -1 ||
      (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') === -1) ||
      (ua.indexOf('Macintosh') > -1 && 'ontouchend' in document) // iPadOS分岐を追加
    ) return true
    return false
  }

  static isTouch()
  {
    return this.isSP() || this.isTablet()
  }
  
  static isWindows()
  {
    return navigator.userAgent.toLowerCase().indexOf('windows') > 0
  }
  
  static getBrowser()
  {
      const ua = navigator.userAgent.toLowerCase()
      const ver = navigator.appVersion.toLowerCase()
      let name = 'unknown'
      if(ua.indexOf("msie") != -1)           name = 'ie'
      else if(ua.indexOf('trident/7') != -1) name = 'ie11'
      else if(ua.indexOf('edge/') != -1)     name = 'edge-legacy'
      else if(ua.indexOf('edg/') != -1)      name = 'edge-chromium'
      else if(ua.indexOf('chrome') != -1)    name = 'chrome'
      else if(ua.indexOf('safari') != -1)    name = 'safari'
      // else if(ua.indexOf('opera') != -1)     name = 'opera'
      else if(ua.indexOf('firefox') != -1)   name = 'firefox'
      return name
  }

  /**
  * [static] getLocationSearch
  * ページのパラメータを全て取得します.
  */
  // static getLocationSearch()
  // {
  //   if(window.location.search) return window.location.search.substring(1,window.location.search.length)
  //   return null
  // }


  /**
  * [static] getQuery
  * ページのパラメータをオブジェクトで返します.
  */
  // static getQuery()
  // {
  //  let query = window.location.search
  //  let params = {}
  //  if (query) {
  //    let reg = query.match(/(.*)(\?)(.*)/)
  //    if (RegExp.$3) {
  //     let a = RegExp.$3.split("&")
  //     if (a) {
  //       for (let k = 0 k < a.length k++) {
  //        let p = a[k].split("=")
  //        if (p[0]) params[p[0]] = p[1]
  //       }
  //     } else return false
  //    } else return false
  //  } else return false
  //  return params
  // }
  /**
  * [static] removeQuery
  * ページのパラメータを消す
  */
  // static removeQuery()
  // {
  //   if (window.history && window.history.pushState)
  //   {
  //     let url = location.href

  //     if (url.indexOf("?") > -1)
  //     {
  //       url = url.split("?")[0]
  //       window.history.pushState("", document.title, url)
  //     }
  //   }
  // }
}
