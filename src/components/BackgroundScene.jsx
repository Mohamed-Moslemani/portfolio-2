import { scene } from '../data/scene'

/* ---------------------------------------------------------------
   BackgroundScene: the ambient layer behind the whole site.

   Two parts, both decorative and both pointer-events:none:

     1. slow drifting colour fields (mint / blush / lilac)
     2. the illustration set in src/data/scene.js

   The artwork itself is a plain image file, not markup, so it can be
   opened and edited in any vector editor and swapped without
   touching React. Drop a different file in public/scene/, point
   scene.image at it, done.

   Both parts hold still under prefers-reduced-motion.
   --------------------------------------------------------------- */

export default function BackgroundScene() {
  return (
    <div className="scene" aria-hidden="true">
      <span className="scene__field scene__field--a" />
      <span className="scene__field scene__field--b" />
      <span className="scene__field scene__field--c" />

      {scene.image && (
        <img
          className="scene__art"
          src={scene.image}
          alt=""
          style={{ '--art-opacity': scene.opacity, objectPosition: scene.position }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}
