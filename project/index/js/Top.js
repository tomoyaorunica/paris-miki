import _ from '@/js/utils/Util'
import Sec1_KV from './Sec1_KV'

export default class Top
{
  constructor()
  {
    this.el = _.selector(".p-top")
    if(!this.el) return
    
    this.kv = new Sec1_KV()
  }
}