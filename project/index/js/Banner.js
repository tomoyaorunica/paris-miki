
import _ from '@/js/utils/Util'
import EventEmitter from '@/js/events/EventEmitter'
import GlobalData from '@/js/model/GlobalData'

export default class Banner
{
  constructor()
  {
    this.banner = _.selector(".p-fixed-banner")
    if(!this.banner) return

    this.sec4_link = _.selector(".p-top-sec4__link")


    EventEmitter.ee.on("intro-end", () =>
    {
      let wait = 1

      _.delayedCall(() =>
      {
        this.run()
      }, wait)
    })

    EventEmitter.ee.on("loaded:once", () =>
    {
      if(GlobalData.hasIntro) return
      let wait = .8

      _.delayedCall(() =>
      {
        this.run()
      }, wait)
    })

  }

  run()
  {

    this.io = new IntersectionObserver( entries =>
    {
      entries.forEach( entry =>
      {
        const target = entry.target

        if(entry.isIntersecting)
        {
          _.removeClass(this.banner, "-show")

          // if(entry.boundingClientRect.top > 0)
          // {
          //   // console.log("下からIN")
          // }
          // else
          // {
            // console.log("上からIN")
          // }
        }
        else
        {
          if(entry.boundingClientRect.top > 0 && entry.intersectionRatio === 0)
          {
            // console.log("下へOUT")
            _.addClass(this.banner, "-show")
          }
          // else
          // {
            // console.log("上へOUT")
          // }
        }
      })
    }, {
      rootMargin: '0% 0% 25%',
      threshold: 0
    })

    this.io.observe(this.sec4_link)

    _.addClass(this.banner, "-ready")
  }
}