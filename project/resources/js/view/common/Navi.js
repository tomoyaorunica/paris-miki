
import _ from '@/js/utils/Util'
import Btn from '@/js/core/Btn'
import GlobalData from '@/js/model/GlobalData'
import EventEmitter from '@/js/events/EventEmitter'

export default class Navi
{
  constructor()
  {
    this.nav = _.selector(".p-nav")
    if(!this.nav) return


    // GlobalData.isNavOpen = false
    

    // this.header_toggle = _.selector(".p-header-toggle")
    // // this.nav_toggle    = _.selector(".p-nav__toggle")

    // new Btn(this.header_toggle
    // ,() => {
    //   this.toggleTrigg()
    // })

    // // new Btn(this.nav_toggle
    // // ,() => {
    // //   this.toggleTrigg()
    // // })
    
    // EventEmitter.ee.on("page:view", visit =>
    // {
    //   this.close()
    // })
    
    // EventEmitter.ee.on("content:replace", () =>
    // {
    //   this.close2()
    // })
    
    // EventEmitter.ee.on("typo-font-loaded", () =>
    // {
    //   let wait = .5

    //   _.delayedCall(() =>
    //   {
    //     this.typo = new NaviTypo()
    //     this.typo.init()
    //   }, wait)
    // })



    //test
    // let wait = 1

    // _.delayedCall(() =>
    // {
    //   this.show()
    // }, wait)
  }
  
  // ////////////////////////////////////////////////////////////
  
  // toggleTrigg()
  // {
  //   if(GlobalData.isNavOpen)
  //   {
  //     GlobalData.isNavOpen = false
  //     this.hide()
  //   }
  //   else
  //   {
  //     GlobalData.isNavOpen = true
  //     this.show()
  //   }
  // }

  // close()
  // {
  //   if(!GlobalData.isNavOpen) return
  //   GlobalData.isNavOpen = false
  //   this.hide()
  // }

  // close2()
  // {
  //   if(!GlobalData.isNavOpen) return
  //   GlobalData.isNavOpen = false
  //   this.hide2()
  // }
  
  // ////////////////////////////////////////////////////////////

  // show()
  // {
  //   // if(GlobalData.isNavOpen) return
  //   // GlobalData.isNavOpen = true

  //   _.addClass(this.nav, "-show")
  //   _.addClass(this.header_toggle, "-close")
    
  //   let wait = 1
    
  //   EventEmitter.ee.emit("disable-cover-timer", wait)
  //   EventEmitter.ee.emit("kill-scroll", true)

  //   EventEmitter.ee.emit("show-nav")
  //   EventEmitter.ee.emit("start-nav-typo")
  // }

  // hide()
  // {
  //   // if(!GlobalData.isNavOpen) return
  //   // GlobalData.isNavOpen = false
    
  //   _.addClass(this.nav, "-hide")
  //   _.removeClass(this.header_toggle, "-close")

  //   let wait = .5
    
  //   _.delayedCall(() =>
  //   {
  //     _.removeClass(this.nav, "-show")
  //     _.removeClass(this.nav, "-hide")
  //     EventEmitter.ee.emit("stop-nav-typo")
  //   }, wait)
    
  //   EventEmitter.ee.emit("disable-cover-timer", wait)
  //   EventEmitter.ee.emit("kill-scroll", false)
  //   EventEmitter.ee.emit("hide-nav")
  // }

  // hide2()
  // {
  //   _.removeClass(this.nav, "-show")
  //   _.removeClass(this.nav, "-hide")
  //   _.removeClass(this.header_toggle, "-close")

  //   EventEmitter.ee.emit("kill-scroll", false)
  //   EventEmitter.ee.emit("stop-nav-typo")
  //   EventEmitter.ee.emit("hide-nav")
  // }
}