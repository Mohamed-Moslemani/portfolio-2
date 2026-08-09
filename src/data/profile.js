/* ---------------------------------------------------------------
   profile.js: identity, contact and links.

   Anything not confirmed is `null`. Every component that consumes a
   link checks for null and hides the action rather than rendering a
   dead button. Fill a value in here and it appears everywhere.
   --------------------------------------------------------------- */

export const profile = {
  name: 'Jana Jaffal',
  initials: 'JJ',
  role: 'Computer Science graduate / data, AI & software',
  altRole: 'Artist & illustrator',
  location: 'Beirut, Lebanon',
  locationShort: 'Beirut / Lebanon',

  email: 'janajaffal86@gmail.com',

  /* No phone number here on purpose. Anything in this object is
     imported by components, so it ends up in the public JS bundle
     whether or not it is rendered. Contact details that should stay
     private belong on the CV, not in the source. */

  status: {
    label: 'currently',
    value: 'drawing + building',
  },

  facts: [
    { label: 'Based in', value: 'Beirut, Lebanon' },
    { label: 'Education', value: 'AUB Computer Science' },
    { label: 'Focus', value: 'Data / AI' },
    { label: 'Also', value: 'Artist' },
  ],

  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Russian', level: 'Spoken' },
  ],
}

export const links = {
  linkedin: 'https://www.linkedin.com/in/jana-jaffal-386189344/',
  github: null, // TODO: add GitHub profile URL
  instagram: null, // TODO: add art Instagram if Jana wants one linked
  cv: null, // TODO: drop a PDF in /public and point here, e.g. '/jana-jaffal-cv.pdf'
}

/* Contact channels, in display order. Nulls are filtered out at render. */
export const contactChannels = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: 'mail',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: links.linkedin ? 'jana-jaffal' : null,
    href: links.linkedin,
    icon: 'linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: links.github ? 'github' : null,
    href: links.github,
    icon: 'github',
  },
].filter((channel) => Boolean(channel.href))

export const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'work', label: 'Work' },
  { id: 'art', label: 'Art' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]
