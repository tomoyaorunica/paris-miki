import _ from '@/js/utils/Util'
import GlobalData from '@/js/model/GlobalData'
import Event from '@/js/events/Event'
import DisableCover from '@/js/controller/DisableCover'
import EventEmitter from '@/js/events/EventEmitter'
import IOManager from '@/js/controller/IOManager'
import Scroll from '@/js/utils/Scroll'
// import Common from '@/js/view/common/Common'

import Top from '/index/js/Top'

import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export default class Main
{
  constructor()
  {

    GlobalData.hasIntro = false
    GlobalData.isIntroEnd = true

    if (!sessionStorage.getItem('introShown'))
    {
      GlobalData.hasIntro = true
      GlobalData.isIntroEnd = false
      sessionStorage.setItem('introShown', 'true');
    }

    GlobalData.hasIntro = true
    GlobalData.isIntroEnd = false

    const container = _.selector(".l-container")
    GlobalData.hasIntro ? _.addClass(container, "-intro") : _.addClass(container, "-no-intro")




    gsap.registerPlugin(ScrollToPlugin)

    //-------------------------

    // breakpointをまたいだらリロードする
    // window.matchMedia("(max-width:768px)").addEventListener("change", () => {
    //   window.location.reload()
    // })
    
    GlobalData.setViewFlag()

    this.setTabletViewport()
    this.setLoadHandler()
    // this.checkAnchor()
    Event.add(this.listen.bind(this))
    
  }

  listen(param)
  {
    switch(param)
    {
      case Event.READY:
        this.ready()
        break
      case Event.RESIZE:
        this.resize()
        this.rotate()
        break
      case Event.SCROLL:
        this.scroll()
        break
      case Event.LOAD:
        this.loaded()
        break
    }
  }
  
  ////////////////////////////////////////////////////////////

  ready()
  {
    this.maxH = window.innerHeight
    this.html = document.documentElement
    this.container = _.selector(".l-container")

    DisableCover.init()

    Event.resize()

    new Top()
    // new Common()
    
    this.scrollTrigger()
  }
  
  ////////////////////////////////////////////////////////////

  loaded()
  {
    EventEmitter.ee.emit("ready", "dom")
  }


  setLoadHandler()
  {
    this.isLoaded = false

    let flags = {
      dom  : false,
    }
    
    EventEmitter.ee.on("ready", type =>
    {
      flags[type] = true

      // console.log(flags)

      if(flags.dom)
      {
        if(this.isLoaded) return
        this.isLoaded = true
        
        Event.resize()
        // this.checkAnchor()

        _.delayedCall(() =>
        {
          EventEmitter.ee.emit("loaded:once")

          // if(!GlobalData.hasIntro) 
            this.setIO()
        }, 1/30)
      }
    })
  }

  setIO()
  {
    IOManager.init()
  }

  ////////////////////////////////////////////////////////////

  // checkAnchor()
  // {
  //   // if(GlobalData.isSPView) return
    
  //   const hash = location.hash;

  //   if(hash)
  //   {
  //     const target = _.el(hash.replace(/#/g, ""))

  //     if(target)
  //     {
  //       let wait = .6

  //       gsap.to(window, { duration: .1, scrollTo: 0 });

  //       _.delayedCall(() =>
  //       {
  //         const top = target.getBoundingClientRect().top
  //         let   dur = Math.min(1, Math.abs(top) * .0004)
  //         // console.log(top, dur)
  //         gsap.to(window, { duration: dur, scrollTo: target, ease:"power1.inOut" });
  //       }, wait)
  //     }
  //   }
  // }

  ////////////////////////////////////////////////////////////
  
  scrollTrigger()
  {
    EventEmitter.ee.on("kill-wheel", bool =>
    {
      if(bool)
      {
        _.addClass(this.html, "-no-scroll")
      }
      else
      {
        _.removeClass(this.html, "-no-scroll")
      }
    })

    EventEmitter.ee.on("kill-scroll", bool =>
    {
      if(bool)
      {
        _.addClass(this.html, "-no-scroll")
      }
      else
      {
        _.removeClass(this.html, "-no-scroll")
      }
    })
    
    EventEmitter.ee.on("scrollto", info =>
    {
      let duration = 1

      const rect = info.target.getBoundingClientRect()
      const top  = rect.top + window.pageYOffset
      // window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
      Scroll.to(top, duration)

      EventEmitter.ee.emit("disable-cover-timer", duration)
        
    })
    
    EventEmitter.ee.on("scrolltop", () =>
    {
      const duration = 1.2
      
      // window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
      Scroll.to(0, duration)

      EventEmitter.ee.emit("disable-cover-timer", duration)
    })
  }

  ////////////////////////////////////////////////////////////

  scroll()
  {

  }
  
  resize()
  {
    if(window.innerHeight > this.maxH) this.maxH = window.innerHeight
    GlobalData.setViewFlag()
    document.documentElement.style.setProperty('--vh', `${Event.size.wh}px`)
    document.documentElement.style.setProperty('--ih', `${window.innerHeight}px`)
    document.documentElement.style.setProperty('--maxh', `${this.maxH}px`)

    Event.size.maxH = this.maxH
  }
  
  rotate()
  {
    if(!GlobalData.isTablet) return

    let b = document.body
    if(Event.size.isPortrait)
    {
      _.removeClass(b, "-landscape")
      _.addClass(b, "-portrait")
    }
    else
    {
      _.removeClass(b, "-portrait")
      _.addClass(b, "-landscape")
    }
    GlobalData.setViewFlag()
  }
  
  setTabletViewport()
  {
    if(GlobalData.isTablet)
    {
      _.addClass(document.body, "-tablet")
      document.querySelector("meta[name='viewport']").setAttribute("content", "width=1280")
    }
  }
}

new Main()