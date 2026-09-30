export const collections = [
  {
    slug: 'essentials',
    number: '01',
    name: 'Essentials',
    eyebrow: 'The Everyday Wardrobe',
    short: 'Modern staples, elevated details. Designed for every chapter of you.',
    description:
      'The pieces you reach for without thinking — refined, versatile and made to last. Crisp linen, fine-gauge knits and soft tailoring in a palette of ivory, sand and black.',
    hero: '/images/campaign/essentials.jpg',
    heroAlt: 'Model in an ivory linen blazer and a flowing scarf against a sunlit stone wall',
    heroWide: '/images/campaign/hero-ivory.jpg',
    thumb: '/images/campaign/essentials.jpg',
    inspired: {
      title: 'Designed for daily life',
      text: 'Essentials brings together breathable natural fibres and considered cuts — calm, adaptable pieces for workdays, weekends and everything in between.',
      images: ['/images/campaign/spring-fabric.jpg', '/images/campaign/texture.jpg'],
      words: ['Linen', 'Ease', 'Longevity'],
    },
    perspective: {
      title: 'The Essentials Perspective',
      text: 'Fewer, better pieces, worn often and loved for longer.',
      image: '/images/editorial/rack-tones.jpg',
    },
  },
  {
    slug: 'autumn-edit',
    number: '02',
    name: 'Autumn Edit',
    eyebrow: 'Seasonal Perspective',
    season: 'Autumn / Winter ’25',
    short: 'Richer textures. Deeper tones. A new perspective on the season.',
    description:
      'Rich textures. Layered silhouettes. A refined collection for the season’s changing light. The Autumn Edit brings together seasonal wools, cashmere and earthy tones with refined tailoring for modern days and colder nights.',
    hero: '/images/campaign/autumn-hero-b.jpg',
    heroAlt: 'Model in an espresso wool coat seated on a stone plinth in raking autumn light',
    heroWide: '/images/campaign/autumn-hero-a.jpg',
    thumb: '/images/campaign/autumn-man.jpg',
    inspired: {
      title: 'Inspired by the season',
      text: 'The Autumn Edit brings together refined layers, natural fabrics and effortless silhouettes — designed for calm days, cooler evenings and everything in between.',
      images: ['/images/campaign/autumn-branch.jpg', '/images/campaign/autumn-fabric.jpg'],
      words: ['Textures', 'Layers', 'Timelessness'],
    },
    perspective: {
      title: 'The Autumn Perspective',
      text: 'A collection rooted in nature, designed for modern living.',
      image: '/images/editorial/timeline-2025.jpg',
    },
  },
  {
    slug: 'contemporary-classics',
    number: '03',
    name: 'Contemporary Classics',
    eyebrow: 'Timeless Appeal',
    short: 'Iconic silhouettes. Modern refinement. Pieces that transcend trends.',
    description:
      'The blazer, the coat, the trouser, the bag — archetypes we return to every season, refined in cut and fabric until nothing is left to take away.',
    hero: '/images/campaign/about-hero.jpg',
    heroAlt: 'Model in an espresso suit seated in warm, raking light',
    heroWide: '/images/campaign/about-hero.jpg',
    thumb: '/images/campaign/classics.jpg',
    inspired: {
      title: 'Built on archetypes',
      text: 'Tailoring with intent: strong lines, soft structure and fabrics chosen to age beautifully. Classics, reconsidered for how we live now.',
      images: ['/images/editorial/craft-scissors.jpg', '/images/editorial/studio-fabric.jpg'],
      words: ['Structure', 'Proportion', 'Permanence'],
    },
    perspective: {
      title: 'The Classic Perspective',
      text: 'Designed once, worn for decades.',
      image: '/images/editorial/studio-rack.jpg',
    },
  },
  {
    slug: 'evening-wear',
    number: '04',
    name: 'Evening Wear',
    eyebrow: 'For Life’s Special Moments',
    short: 'Statement pieces for extraordinary nights.',
    description:
      'Liquid satin, open backs and sweeping hemlines. An evening collection made in small runs, for the nights you want to remember.',
    hero: '/images/campaign/evening.jpg',
    heroAlt: 'Model in a draped burgundy satin gown with an open back',
    heroWide: '/images/campaign/evening.jpg',
    thumb: '/images/campaign/evening.jpg',
    inspired: {
      title: 'After the light fades',
      text: 'Silk that catches candlelight, cuts that move beautifully, and colour used sparingly — deep burgundy, espresso and black.',
      images: ['/images/campaign/contact-hero.jpg', '/images/campaign/spring-back.jpg'],
      words: ['Satin', 'Movement', 'Occasion'],
    },
    perspective: {
      title: 'The Evening Perspective',
      text: 'Made in small runs, for moments worth dressing for.',
      image: '/images/campaign/confirmation.jpg',
    },
  },
];

export const getCollection = (slug) => collections.find((c) => c.slug === slug);
