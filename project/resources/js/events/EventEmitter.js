/**
import EventEmitter from '@/js/events/EventEmitter'

//listen
EventEmitter.ee.on('event_name', func)

EventEmitter.ee.on("event_name", data =>
{
  
})

//remove
EventEmitter.ee.off('event_name', func)

//emit
EventEmitter.ee.emit('event_name', data)

// listen all
EventEmitter.ee.on('*', (type, e) => console.log(type, e) )
 */

import mitt from 'mitt'

export default class EventEmitter
{
  static ee = mitt()
}
