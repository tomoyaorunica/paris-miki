import _ from '@/js/utils/Util'
import Btn from '@/js/core/Btn'
import EventEmitter from '@/js/events/EventEmitter'
import {gsap} from 'gsap'

export default class Pagetop
{
  constructor()
  {
    this.btn = _.selector(".pagetop__btn")
    if(!this.btn) return

    this.btn_arrow = _.selector(".pagetop__btn >div")

    this.btn._btn = new Btn(this.btn
    ,() => {
      EventEmitter.ee.emit("scrolltop")
    },() => {

      gsap.killTweensOf(this.btn_arrow)
      this.tw = gsap.timeline()
      .to(this.btn_arrow, { duration: .12, ease: "power2.out", y:"-165%", scaleX:.5 })
      .set(this.btn_arrow, { y:"200%", scaleX:.1 })
      .to(this.btn_arrow, { duration: .35, ease: "power4.out", y:"0%", scaleX:1 })

    },() => {
      
    })
  }
}