import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ticker — critical for ScrollTrigger accuracy
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(updatePhysics)
    gsap.ticker.lagSmoothing(0)

    // Tell ScrollTrigger to use Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updatePhysics)
    }
  }, [])

  return lenisRef
}
