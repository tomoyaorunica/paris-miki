import BrowserUtil from '@/js/utils/BrowserUtil'

/**
 * @example
 import GlobalData from '@/js/model/GlobalData'
 */
export default class GlobalData
{
  static isSP     = BrowserUtil.isSP()
  static isTablet = BrowserUtil.isTablet()
  static isIPhone = BrowserUtil.getUserAgent() == "IPHONE"
  // static isIPad    = BrowserUtil.getUserAgent() == "IPAD"
  static isAndroid = BrowserUtil.getUserAgent() == "ANDROID"
  // static isFF      = BrowserUtil.getBrowser()   == "firefox"
  static isSafari = BrowserUtil.getBrowser() == "safari"
  static isWindows = BrowserUtil.isWindows()
  static isTouch   = this.isSP || this.isTablet

  static isWebP = BrowserUtil.isWebp()

  // static isLocal = location.hostname.includes("localhost") || location.hostname.includes("192.168")
  
  //-------------------------------
  
  static isPCView
  static isSPView

  static setViewFlag()
  {
    GlobalData.isPCView = window.innerWidth >= 768
    GlobalData.isSPView = !GlobalData.isPCView
  }
}