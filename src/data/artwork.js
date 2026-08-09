/* ---------------------------------------------------------------
   artwork.js: the sketchbook.

   ┌─────────────────────────────────────────────────────────────┐
   │  EVERYTHING BELOW IS PLACEHOLDER DATA.                      │
   │  None of it represents real work by Jana.                   │
   │                                                             │
   │  To add a real piece:                                       │
   │    1. drop the file in  public/art/                         │
   │    2. set  image: '/art/<file>.webp'                        │
   │    3. set  isPlaceholder: false                             │
   │    4. write a real title, medium, year and alt text         │
   │                                                             │
   │  While `image` is null (or isPlaceholder is true) the card  │
   │  renders a drawn frame instead of an <img>, so the layout   │
   │  is real even before the art arrives.                       │
   └─────────────────────────────────────────────────────────────┘

   ratio: 'portrait' | 'tall' | 'square' | 'landscape' | 'wide'
   --------------------------------------------------------------- */

export const artCategories = ['All', 'Sketch', 'Digital', 'Character', 'Study', 'Other']

export const artworks = [
  {
    id: 1,
    slug: 'placeholder-01',
    title: 'Untitled 01',
    year: '2026',
    medium: 'Graphite on paper',
    category: 'Sketch',
    ratio: 'portrait',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished graphite sketch',
    featured: true,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 2,
    slug: 'placeholder-02',
    title: 'Untitled 02',
    year: '2026',
    medium: 'Digital',
    category: 'Digital',
    ratio: 'landscape',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished digital piece',
    featured: true,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 3,
    slug: 'placeholder-03',
    title: 'Untitled 03',
    year: '2025',
    medium: 'Ink',
    category: 'Character',
    ratio: 'tall',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished ink character drawing',
    featured: true,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 4,
    slug: 'placeholder-04',
    title: 'Untitled 04',
    year: '2025',
    medium: 'Pencil study',
    category: 'Study',
    ratio: 'square',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished pencil study',
    featured: true,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 5,
    slug: 'placeholder-05',
    title: 'Untitled 05',
    year: '2025',
    medium: 'Digital',
    category: 'Digital',
    ratio: 'wide',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished wide digital composition',
    featured: true,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 6,
    slug: 'placeholder-06',
    title: 'Untitled 06',
    year: '2025',
    medium: 'Graphite',
    category: 'Sketch',
    ratio: 'portrait',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished graphite sketch',
    featured: false,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 7,
    slug: 'placeholder-07',
    title: 'Untitled 07',
    year: '2024',
    medium: 'Ink and wash',
    category: 'Study',
    ratio: 'square',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished ink and wash study',
    featured: false,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 8,
    slug: 'placeholder-08',
    title: 'Untitled 08',
    year: '2024',
    medium: 'Digital',
    category: 'Character',
    ratio: 'portrait',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished digital character piece',
    featured: false,
    isPlaceholder: true,
    description: '',
  },
  {
    id: 9,
    slug: 'placeholder-09',
    title: 'Untitled 09',
    year: '2024',
    medium: 'Mixed media',
    category: 'Other',
    ratio: 'landscape',
    image: null,
    thumbnail: null,
    alt: 'Placeholder frame for an unpublished mixed media piece',
    featured: false,
    isPlaceholder: true,
    description: '',
  },
]

export const featuredArtworks = artworks.filter((a) => a.featured)

export const getArtworkBySlug = (slug) => artworks.find((a) => a.slug === slug) ?? null

export const getArtworkNeighbours = (slug) => {
  const i = artworks.findIndex((a) => a.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? artworks[i - 1] : artworks[artworks.length - 1],
    next: i < artworks.length - 1 ? artworks[i + 1] : artworks[0],
  }
}

/* Only offer filters for categories that actually have work in them. */
export const availableCategories = artCategories.filter(
  (c) => c === 'All' || artworks.some((a) => a.category === c),
)

export const hasRealArtwork = artworks.some((a) => !a.isPlaceholder && a.image)
