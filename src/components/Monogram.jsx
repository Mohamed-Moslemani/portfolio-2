/* ---------------------------------------------------------------
   Monogram: "J/" set in type, not an image asset. The slash is the
   quiet bit of personality: a pen stroke leaning out of the letter.
   --------------------------------------------------------------- */

export default function Monogram({ label = 'Jana Jaffal, home' }) {
  return (
    <span className="monogram" aria-label={label}>
      <span className="monogram__j" aria-hidden="true">
        J
      </span>
      <span className="monogram__j monogram__j--second" aria-hidden="true">
        J
      </span>
    </span>
  )
}
