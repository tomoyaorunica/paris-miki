import _ from '@/js/utils/Util'
import EventEmitter from '@/js/events/EventEmitter'

/**
 * import DisableCover from '@/js/controller/DisableCover'
 */

export default class DisableCover
{
  static SHOW  = "disable-cover-show"
  static HIDE  = "disable-cover-hide"
  static TIMER = "disable-cover-timer"

	static init()
	{
    this.timerInt = -1
    this.isInitDom = false

    EventEmitter.ee.on(DisableCover.SHOW, ()=>{ this.show() })
    EventEmitter.ee.on(DisableCover.HIDE, ()=>{ this.hide() })
    EventEmitter.ee.on(DisableCover.TIMER, wait =>{ this.timer(wait) })
	}

  static createEl()
  {
    if(!this.isInitDom)
    {
      this.isInitDom = true

      this.cover = _.selector(".js-disable-cover")

      if(!this.cover)
      {
        this.cover = document.createElement("div")
        document.body.appendChild(this.cover)
        _.addClass(this.cover, "js-disable-cover")
        
        this.cover.style.position = "fixed"
        this.cover.style.top  = 0
        this.cover.style.left = 0
        this.cover.style.width  = "100%"
        this.cover.style.height = "100%"
        this.cover.style.background = "rgba(0,0,0,0)"
        // this.cover.style.background = "rgba(255,0,0,.3)"
        this.cover.style.zIndex  = 99999
        this.cover.style.display = "none"
      }

    }
  }
  
  /**
   * @example DisableCover.show()
   */
  static show()
  {
    this.createEl()
    this.cover.style.display = "block"
  }
  
  /**
   * @example DisableCover.hide()
   */
  static hide()
  {
    this.createEl()
    this.cover.style.display = "none"
  }

  /**
   * @example DisableCover.timer(1)
   */
  static timer(wait)
  {
    EventEmitter.ee.emit(DisableCover.SHOW)

    clearTimeout(this.timerInt)
    this.timerInt = setTimeout(DisableCover.timerDone, wait * 1000)
  }

  static timerDone()
  {
    EventEmitter.ee.emit(DisableCover.HIDE)
  }
}