/* ---------------------------------------------------------------
   scene.js: the artwork behind the site.

   The artwork is a plain image file, editable in any vector tool
   without touching React. To change it:

     1. put the file in  public/scene/
     2. point `image` at it, e.g. '/scene/your-file.webp'
     3. set `image: null` to drop the artwork entirely; the drifting
        colour fields carry the background on their own

   The previous hand-drawn version is still here as coding.svg if the
   flat-vector look is ever wanted back.

   Opaque images are feathered at the edges in background.css, so a
   rectangular photo does not show its corners against the page.

   Only use a file Jana owns or has licensed. A watermarked stock
   preview is not licensed: publishing one on a live site is
   infringement, and the watermark shows. Licensed stock (Dreamstime,
   Adobe Stock, Freepik) is fine once bought, and so is anything she
   draws herself.

   `opacity` is how strongly it sits behind the text. Photographs and
   dense illustrations need a lower number than line art does, or the
   body copy stops being readable on top of them.
   --------------------------------------------------------------- */

export const scene = {
  image: '/scene/coding.webp',
  alt: 'Illustration of a girl in a hijab writing code at a desk at night',
  opacity: 0.28,
  /* Where the image anchors, as a CSS object-position value. */
  position: 'right bottom',
}
