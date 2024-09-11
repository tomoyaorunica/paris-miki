
import _ from '@/js/utils/Util'
import GlobalData from '@/js/model/GlobalData'
import EventEmitter from '@/js/events/EventEmitter'

export default class Sec0_Intro
{
  constructor()
  {
    if(!GlobalData.hasIntro) return

    this.intro = _.selector(".p-top-intro")

    let wait = .3

    _.delayedCall(() =>
    {
      this.start()
    }, wait)
  }
  
  start()
  {
    _.addClass(this.intro, "-show")

    let wait = 7

    _.delayedCall(() =>
    {
      _.addClass(this.intro, "-hide")

      EventEmitter.ee.emit("intro-end")
    }, wait)
  }
}