import _ from '@/js/utils/Util'
import EventEmitter from '@/js/events/EventEmitter'
import RenderUtil from '@/js/utils/RenderUtil'

/**
 * import Scroll from '@/js/utils/Scroll'
 */

export default class Scroll
{
  static target

  static init()
  {
    if(this.isInit) return
    this.isInit = true

    this.timer = -1
    this.render = this.render.bind(this)
  }

  static setDefaultTarget()
  {
    let target
    if('scrollingElement' in document) target = document.scrollingElement
    else if('WebkitAppearance' in document.documentElement.style) target = document.body
    else target = document.documentElement

    return target
  }

  /**
   * @example Scroll.set(0)
   */
  static set(y = 0, target = null)
  {
    this.init()

    if(target) this.target = target
    else this.target = this.setDefaultTarget()
    
    this.target.scrollTop = y
  }

  /**
   * @example Scroll.to(0, 1, Scroll.Power4easeInOut)
   */
  static to(y, time = .3, target = null, ease = Scroll.Power3easeInOut)
  {
    this.init()

    if(target) this.target = target
    else this.target = this.setDefaultTarget()
    
    this.startY    = this.target.scrollTop
    this.endY      = y
    this.duration  = time * 1000
    this.startTime = performance.now()
    this.ease      = ease

    RenderUtil.add(this.render)

    EventEmitter.ee.emit("scroll_start")

    _.killDelayedCall(this.timer)
    this.timer = _.delayedCall(() =>
    {
      EventEmitter.ee.emit("scroll_end")
    }, time)

    // console.log(y)
  }

  static render()
  {
    let time = performance.now() - this.startTime
    let top = this.ease(time, this.startY, this.endY - this.startY, this.duration)

    this.target.scrollTop = top
    if (time >= this.duration) RenderUtil.remove(this.render)
  }

  /**
   * https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
   * 使わないものはコメントアウトしてあるので適宜使う
   */

  // static easeInQuad(t, b, c, d)
  // {
  //   return c * (t /= d) * t + b
  // }

  // static easeOutQuad(t, b, c, d)
  // {
  //   return -c * (t /= d) * (t - 2) + b
  // }

  // static easeInOutQuad(t, b, c, d)
  // {
  //   if((t /= d / 2) < 1) return c / 2 * t * t + b
  //   return -c / 2 * ((--t) * (t - 2) - 1) + b
  // }

  // static Power1easeIn = Scroll.easeInQuad
  // static Power1easeOut = Scroll.easeOutQuad
  // static Power1easeInOut = Scroll.easeInOutQuad

  //------------------

  // static easeInCubic(t, b, c, d)
  // {
  //   return c * (t /= d) * t * t + b
  // }

  // static easeOutCubic(t, b, c, d)
  // {
  //   return c * ((t = t / d - 1) * t * t + 1) + b
  // }

  // static easeInOutCubic(t, b, c, d)
  // {
  //   if((t /= d / 2) < 1) return c / 2 * t * t * t + b
  //   return c / 2 * ((t -= 2) * t * t + 2) + b
  // }
  // static Power2easeIn = Scroll.easeInCubic
  // static Power2easeOut = Scroll.easeOutCubic
  // static Power2easeInOut = Scroll.easeInOutCubic

  //------------------

  // static easeInQuart(t, b, c, d)
  // {
  //   return c * (t /= d) * t * t * t + b
  // }

  // static easeOutQuart(t, b, c, d)
  // {
  //   return -c * ((t = t / d - 1) * t * t * t - 1) + b
  // }

  static easeInOutQuart(t, b, c, d)
  {
    if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b
  }

  // static Power3easeIn = Scroll.easeInQuart
  // static Power3easeOut = Scroll.easeOutQuart
  static Power3easeInOut = Scroll.easeInOutQuart

  //------------------

  // static easeInQuint(t, b, c, d)
  // {
  //   return c * (t /= d) * t * t * t * t + b
  // }

  // static easeOutQuint(t, b, c, d)
  // {
  //   return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  // }

  // static easeInOutQuint(t, b, c, d)
  // {
  //   if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
  //   return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
  // }

  // static Power4easeIn = Scroll.easeInQuint
  // static Power4easeOut = Scroll.easeOutQuint
  // static Power4easeInOut = Scroll.easeInOutQuint

  //------------------

  // static easeInExpo(t, b, c, d)
  // {
  //   return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  // }

  // static easeOutExpo(t, b, c, d)
  // {
  //   return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
  // }

  // static easeInOutExpo(t, b, c, d)
  // {
  //   if(t == 0) return b
  //   if(t == d) return b + c
  //   if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
  //   return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
  // }

  // static ExpoEaseIn = Scroll.easeInExpo
  // static ExpoEaseOut = Scroll.easeOutExpo
  // static ExpoEaseInOut = Scroll.easeInOutExpo
  
  //------------------

  // static easeInSine(t, b, c, d)
  // {
  //   return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
  // }

  // static easeOutSine(t, b, c, d)
  // {
  //   return c * Math.sin(t / d * (Math.PI / 2)) + b
  // }

  // static easeInOutSine(t, b, c, d)
  // {
  //   return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
  // }

  //------------------

  // static easeInCirc(t, b, c, d)
  // {
  //   return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  // }

  // static easeOutCirc(t, b, c, d)
  // {
  //   return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  // }

  // static easeInOutCirc(t, b, c, d)
  // {
  //   if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b
  //   return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  // }

}