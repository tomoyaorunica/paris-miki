import _ from '@/js/utils/Util'
import Sec1_KV from './Sec1_KV'
import Sec2_Modal from './Sec2_Modal'

export default class Top
{
  constructor()
  {
    this.el = _.selector(".p-top")
    if(!this.el) return
    
    new Sec1_KV()
    new Sec2_Modal()
  }
}