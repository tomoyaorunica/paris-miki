import _ from '@/js/utils/Util'

export default class IOManager
{
  static init()
  {
    
    _.selectorAll("[data-inview]").forEach((el, i) =>
    {
      // const rootMargin1 = el.dataset.inviewRootMargin || '0% 0% -5% 0%'
      const rootMargin1 = el.dataset.inviewRootMargin || '0% 0% 0% 0%'
      const options1 = {
          rootMargin: rootMargin1,
          threshold: [0, 1]
      }

      const io_in = new IntersectionObserver( entries =>
      {

        entries.forEach( entry =>
        {
          const target = entry.target

          if(entry.isIntersecting)
          {
            _.addClass(target, "-inview")

            // data-inview-unobserve="true" がある場合は解除
            if(target.dataset.inviewUnobserve === "true")
            {
              io_in.unobserve(target)
            }
            
            // if(entry.boundingClientRect.top > 0)
            // {
            //   // t("下からIN")
            // }
            // else
            // {
            //   // t("上からIN")
            // }
          }
          else
          {
            // if(entry.boundingClientRect.top > 0 && entry.intersectionRatio === 0)
            // {
            //   // t("下へOUT")
            //   _.removeClass(target, "-inview")
            // }
            // else
            // {
            //   // t("上へOUT")
            // }
          }
        })
      }, options1)


      const options2 = {
          rootMargin: '0% 0%',
          threshold: 0
      }

      const io_out = new IntersectionObserver( entries =>
      {

        entries.forEach( entry =>
        {
          const target = entry.target

          if(entry.isIntersecting)
          {
            // _.addClass(target, "-inview")

            // // data-inview-unobserve="true" がある場合は解除
            // if(target.dataset.inviewUnobserve === "true")
            // {
            //   io_out.unobserve(target)
            // }
            
            // if(entry.boundingClientRect.top > 0)
            // {
            //   // t("下からIN")
            // }
            // else
            // {
            //   // t("上からIN")
            // }
          }
          else
          {

            if(entry.boundingClientRect.top > 0 && entry.intersectionRatio === 0)
            {
              // t("下へOUT")
              _.removeClass(target, "-inview")
            }
            else
            {
              // t("上へOUT")
            }
          }
        })
      }, options2)
      
      io_in.observe(el)
      io_out.observe(el)
    })
  }
}