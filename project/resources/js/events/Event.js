import _ from '@/js/utils/Util'
import EventEmitter from '@/js/events/EventEmitter'

let resizeInt = -1
let pageSize


/**
 *	import Event from '@/js/events/Event'
 *
 * Event.add(this.listen.bind(this))
 * // or
 * // Event.add((param)=>this.listen(param))
 * 
 * listen(param)
 * {
 *   switch(param)
 *   {
 *     case Event.READY:

 *       break
 *     case Event.LOAD:

 *       break
 *     case Event.SCROLL:
 *       this.scroll()
 *       break
 *     case Event.RESIZE:
 *       this.resize()
 *       break
 *   }
 * }
 */
export default class Event
{
  static READY            = "DOMContentLoaded"
  static DOMContentLoaded = "DOMContentLoaded"
  static LOAD             = "load"
  static UNLOAD           = "unload"
  static COMPLETE         = "complete"
  static RESIZE           = "resize"
  static SCROLL           = "scroll"
  static ROTATE           = "rotate"

  static ENABLE  = "enable"
  static DISABLE = "disable"

  static isSupportPassive = false
  static isPortrait       = false

  constructor()
  {
    // EventEmitter.ee.on('viewEvent', data => {
    // 	console.log('[ viewEvent ::: ' + data + ' ]')
    // })

    // passive ----------------------------------------------

    try {
      let options = Object.defineProperty({}, "passive", {
        get: () => {
          Event.isSupportPassive = true
        }
      })

      window.addEventListener("test", options, options)
      window.removeEventListener("test", options, options)
    } catch(err) {
      Event.isSupportPassive = false
    }

    // t("Event.isSupportPassive:" + Event.isSupportPassive)


    // ready ------------------------------------------------

    if(document.readyState === Event.COMPLETE)
    {
      EventEmitter.ee.emit("viewEvent", Event.READY)
    }
    else
    {
      let _ready = () =>
      {
        document.removeEventListener(Event.READY, _ready, false)
        EventEmitter.ee.emit("viewEvent", Event.READY)
      }

      document.addEventListener(Event.READY, _ready, false)
    }

    // load ------------------------------------------------
    let _load = () =>
    {
      window.removeEventListener(Event.LOAD, _load)
      EventEmitter.ee.emit("viewEvent", Event.LOAD)
    }
    window.addEventListener(Event.LOAD, _load, false)


    // scroll ------------------------------------------------

    let _scroll = () =>
    {
      pageSize = _.getPageSize()
      pageSize.isPortrait = Event.isPortrait
      EventEmitter.ee.emit("viewEvent", Event.SCROLL)
    }
    window.addEventListener(Event.SCROLL, _scroll, Event.passive())


    // resize ---------------------------------------

    let _resize = () =>
    {
      clearTimeout(resizeInt)
      resizeInt = setTimeout(() =>
      {
        pageSize = _.getPageSize()
        pageSize.isPortrait = Event.isPortrait
        EventEmitter.ee.emit("viewEvent", Event.RESIZE)
      }, 1000/30)
    }
    window.addEventListener(Event.RESIZE, _resize, false)



    // orientation ------------------------------------------------

    const mqRotation = window.matchMedia('(orientation: portrait)')

    const orientationChange = (mqRotation) =>
    {
      // true: 縦長 / false: 横長
      Event.isPortrait = mqRotation.matches ? true : false

      pageSize = _.getPageSize()
      pageSize.isPortrait = Event.isPortrait
      EventEmitter.ee.emit("viewEvent", Event.ROTATE)
    }
    mqRotation.addListener(orientationChange)
    orientationChange(mqRotation)
  }

  static passive()
  {
    let result = Event.isSupportPassive ? { passive: true } : false
    // t(result)
    return result
  }

  /**
   * スクロールターゲット指定
   */
  static setScrollTarget(el)
  {
    let _scroll = () =>
    {
      pageSize = _.getPageSize()
      pageSize.sy = el.scrollTop
      pageSize.isPortrait = Event.isPortrait
      EventEmitter.ee.emit("viewEvent", Event.SCROLL)
    }
    el.addEventListener(Event.SCROLL, _scroll, Event.passive())
  }

  /**
   * 強制実行
   */
  static scroll()
  {
    pageSize = _.getPageSize()
    pageSize.isPortrait = Event.isPortrait
    EventEmitter.ee.emit("viewEvent", Event.SCROLL)
  }

  /**
   * 強制実行
   */
  static resize()
  {
    pageSize = _.getPageSize()
    pageSize.isPortrait = Event.isPortrait
    EventEmitter.ee.emit("viewEvent", Event.RESIZE)
  }

  static get size()
  {
    return pageSize
  }

  static add(func)
  {
    EventEmitter.ee.on("viewEvent", func)
  }

  static remove(func)
  {
    EventEmitter.ee.off("viewEvent", func)
  }
}

new Event()