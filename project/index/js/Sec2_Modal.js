
import _ from '@/js/utils/Util'

import Btn from '@/js/core/Btn'
// import GlobalData from '@/js/model/GlobalData'
// import Event from '@/js/events/Event'
import EventEmitter from '@/js/events/EventEmitter'

export default class Sec2_Modal
{
  constructor()
  {
    this.modal = _.selector(".p-top-sec2__modal")
    if(!this.modal) return


    this.inner = _.selector(".p-top-sec2__modal__inner1")

    this.btn_open = _.selector(".p-top-sec2__block2 .border-box2 .c-btn-round")

    new Btn(this.btn_open
    ,() => {
      this.showModal()
    })


    this.bg         = _.selector(".p-top-sec2__modal__inner2__area")
    this.btn_close1 = _.selector(".p-top-sec2__modal__close")
    this.btn_close2 = _.selector(".p-top-sec2__modal .c-btn-round")
    
    new Btn(this.bg
    ,() => {
      this.hideModal()
    })
    
    new Btn(this.btn_close1
    ,() => {
      this.hideModal()
    })
    
    new Btn(this.btn_close2
    ,() => {
      this.hideModal()
    })
  }



  showModal()
  {
    this.inner.scrollTop = 0

    _.addClass(this.modal, "-show")

    EventEmitter.ee.emit("kill-scroll", true)
  }


  hideModal()
  {

    _.addClass(this.modal, "-hide")

    let wait = .5

    _.delayedCall(() =>
    {
      _.removeClass(this.modal, "-hide")
      _.removeClass(this.modal, "-show")
    }, wait)
    

    EventEmitter.ee.emit("disable-cover-timer", wait)

    EventEmitter.ee.emit("kill-scroll", false)
  }

  
}