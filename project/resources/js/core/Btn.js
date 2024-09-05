import Event from '@/js/events/Event'
import GlobalData from '@/js/model/GlobalData'

/**
 * PC/SP共通ボタンクラス

	new Btn(el
		,() => {
			// click
		}
		,() => {
			// over
		}
		,() => {
			// out
		}
	)
	
 */

export default class Btn
{
	static BTN_START = "start"
	static BTN_END   = "end"
	static BTN_ENTER = "mouseenter"
	static BTN_LEAVE = "mouseleave"

	constructor(el, clickFunc, enterFunc = null, leaveFunc = null, timing = Btn.BTN_END)
	{
		if(!el)
		{
			console.warn("no btn element.")
			return
		}
		
		this.el = el
		this.clickFunc = clickFunc
		this.enterFunc = enterFunc
		this.leaveFunc = leaveFunc
		this.timing = timing // or Btn.BTN_START

		this.isTouchDevice = GlobalData.isTouch

		this.START = this.isTouchDevice ? 'touchstart' : 'mousedown'
		this.MOVE  = this.isTouchDevice ? 'touchmove'  : 'mousemove'
		this.END   = this.isTouchDevice ? 'touchend'   : 'mouseup'

		this.isEnable = true
		this.isMove = false
		this.isLeave = false
		this.startX = 0
		this.startY = 0

		this.el_styl = this.el.style

		this.onStart = this.onStart.bind(this)
		this.onMove  = this.onMove.bind(this)
		this.onEnd   = this.onEnd.bind(this)
		this.onEnter = this.onEnter.bind(this)
		this.onLeave = this.onLeave.bind(this)

		this.el_styl.cursor = "pointer"

		if(this.isTouchDevice)
		{
			// wheel、mousewheel、touchstart、touchmove にはpassive付き
			this.el.addEventListener(this.START, this.onStart, Event.passive())
			this.el.addEventListener(this.MOVE,  this.onMove, Event.passive())
			this.el.addEventListener(this.END,   this.onEnd)
		}
		else
		{
			this.el.addEventListener(this.START, this.onStart)
			this.el.addEventListener(this.MOVE,  this.onMove)
			this.el.addEventListener(this.END,   this.onEnd)
			this.el.addEventListener(Btn.BTN_ENTER, this.onEnter)
			this.el.addEventListener(Btn.BTN_LEAVE, this.onLeave)
		}
	}
	
	set enable(bool)
	{
		this.isEnable = bool
		this.el_styl.cursor = this.isEnable ? "pointer" : "auto"
	}

	onStart(e)
	{
		// t("onStart")
		if(!this.isEnable) return

		this.isMove = false
		this.isLeave = false

		if(this.isTouchDevice)
		{
			let touch = e.changedTouches[0]
			this.startX = touch.clientX
			this.startY = touch.clientY
		}

		if(this.timing === Btn.BTN_START) this.clickFunc()
	}

	onMove(e)
	{
		if(!this.isEnable) return

		if(this.isTouchDevice)
		{
			let touch = e.changedTouches[0]
			let currentX = touch.clientX
			let currentY = touch.clientY

			if(Math.abs(this.startX - currentX) > 20) this.isMove = true
			if(Math.abs(this.startY - currentY) > 20) this.isMove = true
		}
	}

	onEnd(e)
	{
		if(!this.isEnable) return
		if(this.isMove) return
		if(this.isLeave) return

		if(this.timing === Btn.BTN_END) this.clickFunc(e)
	}

	onEnter(e)
	{
		//PCのみ
		if(!this.isEnable) return

		if(this.enterFunc) this.enterFunc(e)
	}

	onLeave(e)
	{
		//PCのみ
		if(!this.isEnable) return
		this.isLeave = true

		if(this.leaveFunc) this.leaveFunc(e)
	}


	reset()
	{
		this.el_styl.cursor = "auto"

		this.el.removeEventListener(this.START, this.onStart)
		this.el.removeEventListener(this.MOVE,  this.onMove)
		this.el.removeEventListener(this.END,   this.onEnd)
		
		if(!this.isTouchDevice)
		{
			this.el.removeEventListener(Btn.BTN_ENTER, this.onEnter)
			this.el.removeEventListener(Btn.BTN_LEAVE, this.onLeave)
		}
	}
}