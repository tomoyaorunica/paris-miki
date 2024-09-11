import _ from '@/js/utils/Util'
import Banner from './Banner'
// import Sec1_KV from './Sec1_KV'
import Sec0_Intro from './Sec0_Intro'
import Sec2_Modal from './Sec2_Modal'

export default class Top
{
  constructor()
  {
    this.el = _.selector(".p-top")
    if(!this.el) return
    
    new Sec0_Intro()
    new Sec2_Modal()
    new Banner()
    // new Sec1_KV()
  }
}