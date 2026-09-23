import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type WorkAnimationRefs = {
   workRef: RefObject<HTMLElement | null>;
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useWorkAnimation({ workRef }: WorkAnimationRefs) {
   useGSAP(
      () => {
         gsap.fromTo(
            '.work-title',
            {
               x: 1500,
               opacity: 0.2,
            },
            {
               x: 0,
               opacity: 0.8,
               ease: 'circ.out',
               scrollTrigger: {
                  trigger: '.work-title',
                  start: 'top 90%',
                  end: 'top 20%',
                  invalidateOnRefresh: true,
                  scrub: 1,
               },
            }
         );

         ScrollTrigger.create({
            trigger: '.work-title-wrapper',
            start: 'top 20%',
            end: '+=1000',
            pin: true,
            pinSpacing: false,
         });

         const cards = gsap.utils.toArray<HTMLElement>(
            '.animated-card',
            workRef.current
         );

         cards.forEach((card) => {
            gsap.fromTo(
               card,
               {
                  y: 160,
                  opacity: 1,
                  rotateY: 90,
                  rotateZ: 20,
               },
               {
                  y: 0,
                  opacity: 1,
                  rotateY: 0,
                  rotateZ: 0,
                  duration: 0.8,
                  ease: 'back.out(1.4)',
                  immediateRender: false,
                  scrollTrigger: {
                     trigger: card,
                     start: 'top 90%',
                     invalidateOnRefresh: true,
                     markers: false,
                     scrub: 1,
                  },
               }
            );
         });

         ScrollTrigger.refresh();
      },
      { scope: workRef }
   );
}
