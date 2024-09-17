
import _ from '@/js/utils/Util'
import Btn from '@/js/core/Btn'
import GlobalData from '@/js/model/GlobalData'
import EventEmitter from '@/js/events/EventEmitter'

export default class Sec0_Intro
{
  constructor()
  {
    if(!GlobalData.hasIntro) return

    this.intro = _.selector(".p-top-intro")

    let wait = .1

    _.delayedCall(() =>
    {
      this.start()
    }, wait)

    new Btn(this.intro
    ,() => {
      this.hide()
    })
  }
  
  start()
  {
    _.addClass(this.intro, "-show")

    let wait = 3

    this.int = _.delayedCall(() =>
    {
      this.hide()
    }, wait)
  }

  hide()
  {
    _.killDelayedCall(this.int)
    let wait = 0

    _.addClass(this.intro, "-hide")
    EventEmitter.ee.emit("intro-end")

    wait += 1

    _.delayedCall(() =>
    {
      _.addClass(this.intro, "-none")
    }, wait)
  }
}