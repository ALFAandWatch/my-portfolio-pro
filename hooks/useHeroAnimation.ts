import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeroAnimationRefs = {
   sceneRef: RefObject<HTMLDivElement | null>;
   stageRef: RefObject<HTMLElement | null>;
   revealRef: RefObject<HTMLDivElement | null>;
   outlineRef: RefObject<HTMLDivElement | null>;
   portraitRef: RefObject<HTMLDivElement | null>;
};

export function useHeroAnimation({
   sceneRef,
   stageRef,
   revealRef,
   outlineRef,
   portraitRef,
}: HeroAnimationRefs) {
   useGSAP(
      () => {
         const getCircleClipPath = (
            width: number,
            height: number,
            x: number,
            y: number
         ) =>
            `circle(${Math.min(width, height) / 2}px at ${x + width / 2}px ${y + height / 2}px)`;

         const getInitialBounds = () => {
            const stage = stageRef.current;
            const portrait = portraitRef.current;

            if (!stage || !portrait) return null;

            const stageBounds = stage.getBoundingClientRect();
            const portraitBounds = portrait.getBoundingClientRect();

            return {
               width: portraitBounds.width,
               height: portraitBounds.height,
               x: portraitBounds.left - stageBounds.left,
               y: portraitBounds.top - stageBounds.top,
            };
         };

         const getCoverBounds = () => {
            const stage = stageRef.current;

            if (!stage) return null;

            const stageBounds = stage.getBoundingClientRect();
            const overscan = 32;
            const diameter =
               Math.hypot(stageBounds.width, stageBounds.height) + overscan * 2;

            return {
               width: diameter,
               height: diameter,
               x: (stageBounds.width - diameter) / 2,
               y: (stageBounds.height - diameter) / 2,
            };
         };

         const initialBounds = getInitialBounds();

         if (!initialBounds) return;

         gsap.set(revealRef.current, {
            clipPath: getCircleClipPath(
               initialBounds.width,
               initialBounds.height,
               initialBounds.x,
               initialBounds.y
            ),
         });

         gsap.set(outlineRef.current, {
            x: initialBounds.x,
            y: initialBounds.y,
            width: initialBounds.width,
            height: initialBounds.height,
            borderRadius: '50%',
         });

         gsap
            .timeline({
               scrollTrigger: {
                  trigger: sceneRef.current,
                  start: 'top top+=64',
                  end: '+=200%',
                  pin: sceneRef.current,
                  pinSpacing: true,
                  scrub: 5,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
               },
            })
            .to(revealRef.current, {
               clipPath: () => {
                  const coverBounds = getCoverBounds();

                  return coverBounds
                     ? getCircleClipPath(
                          coverBounds.width,
                          coverBounds.height,
                          coverBounds.x,
                          coverBounds.y
                       )
                     : 'circle(100% at 50% 50%)';
               },
               ease: 'none',
               duration: 1,
            })
            .to(
               outlineRef.current,
               {
                  x: () => getCoverBounds()?.x ?? 0,
                  y: () => getCoverBounds()?.y ?? 0,
                  width: () =>
                     `${getCoverBounds()?.width ?? window.innerWidth}px`,
                  height: () =>
                     `${getCoverBounds()?.height ?? window.innerHeight}px`,
                  borderRadius: '50%',
                  ease: 'none',
                  duration: 1,
               },
               0
            )
            .to({}, { duration: 0.8 });
      },
      { scope: sceneRef }
   );
}
