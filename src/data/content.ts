export const content = {
  nav: {
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Schedule', to: '/schedule' },
      { label: 'About', to: '/about' },
      { label: 'Inquire', to: '/contact' },
    ],
  },

  home: {
    hero: {
      eyebrow: 'Lorem ipsum dolor sit amet',
      headline: 'Lorem ipsum dolor sit amet, consectetur.',
      subheadline:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      cta: 'View Services',
      ctaTo: '/services',
    },
    teaser: {
      label: 'Lorem ipsum',
      headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    },
    serviceTeasers: [
      {
        title: 'Lorem ipsum',
        blurb: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
      },
      {
        title: 'Dolor sit amet',
        blurb: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      },
      {
        title: 'Consectetur',
        blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      },
    ],
    closingCta: {
      headline: 'Lorem ipsum dolor sit amet, consectetur.',
      body: 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipiscing.',
      cta: 'Submit an Inquiry',
      ctaTo: '/contact',
    },
  },

  services: {
    headline: 'Lorem ipsum.',
    subheadline: 'Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    items: [
      {
        title: 'Lorem ipsum',
        duration: 'Lorem ipsum dolor',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        note: 'Lorem ipsum dolor sit amet.',
      },
      {
        title: 'Dolor sit amet',
        duration: 'Lorem ipsum',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
        note: 'Lorem ipsum dolor sit amet consectetur.',
      },
      {
        title: 'Consectetur',
        duration: 'Lorem ipsum',
        description:
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        note: 'Lorem ipsum dolor sit amet adipiscing.',
      },
    ],
    cta: {
      headline: 'Lorem ipsum dolor sit amet?',
      body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.',
      cta: 'Submit an Inquiry',
      ctaTo: '/contact',
    },
  },

  about: {
    eyebrow: 'Lorem ipsum',
    headline: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    paragraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    ],
    pillars: [
      { label: 'Lorem', body: 'Omnis iste natus error sit voluptatem accusantium doloremque.' },
      { label: 'Ipsum', body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.' },
      { label: 'Dolor', body: 'At vero eos et accusamus et iusto odio dignissimos ducimus.' },
    ],
  },

  contact: {
    eyebrow: 'Lorem ipsum',
    headline: 'Lorem ipsum dolor sit amet consectetur.',
    subheadline:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    fields: {
      name: { label: 'Lorem ipsum', placeholder: 'Lorem ipsum dolor' },
      email: { label: 'Lorem ipsum', placeholder: 'email@example.com' },
      service: {
        label: 'Lorem ipsum dolor?',
        options: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Lorem ipsum dolor'],
      },
      message: { label: 'Lorem ipsum', placeholder: 'Lorem ipsum dolor sit amet…' },
      submit: 'Submit Inquiry',
    },
    aside: {
      email: 'email@email.com',
      phone: '555.555.5555',
      social: '@handle',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.',
    },
  },

  gallery: {
    eyebrow: 'Lorem ipsum',
    headline: 'Lorem ipsum dolor.',
    layout: 'portrait' as const,
    categories: [
      {
        label: 'Lorem ipsum',
        images: [
          { src: '/res/img/A7202824.webp',  thumbSrc: '/res/img/A7202824.webp',  alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p01.svg', thumbSrc: '/res/img/filler-p01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p07.svg', thumbSrc: '/res/img/filler-p07.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-s01.svg', thumbSrc: '/res/img/filler-s01.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t01.svg', thumbSrc: '/res/img/filler-t01.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p02.svg', thumbSrc: '/res/img/filler-p02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x01.svg', thumbSrc: '/res/img/filler-x01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x02.svg', thumbSrc: '/res/img/filler-x02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t02.svg', thumbSrc: '/res/img/filler-t02.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x03.svg', thumbSrc: '/res/img/filler-x03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
        ],
      },
      {
        label: 'Dolor sit amet',
        images: [
          { src: '/res/img/filler-p08.svg', thumbSrc: '/res/img/filler-p08.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-s02.svg', thumbSrc: '/res/img/filler-s02.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p03.svg', thumbSrc: '/res/img/filler-p03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x04.svg', thumbSrc: '/res/img/filler-x04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-v01.svg', thumbSrc: '/res/img/filler-v01.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p09.svg', thumbSrc: '/res/img/filler-p09.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x05.svg', thumbSrc: '/res/img/filler-x05.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x07.svg', thumbSrc: '/res/img/filler-x07.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-s03.svg', thumbSrc: '/res/img/filler-s03.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
        ],
      },
      {
        label: 'Consectetur',
        images: [
          { src: '/res/img/filler-p04.svg', thumbSrc: '/res/img/filler-p04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x08.svg', thumbSrc: '/res/img/filler-x08.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t03.svg', thumbSrc: '/res/img/filler-t03.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p10.svg', thumbSrc: '/res/img/filler-p10.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-v02.svg', thumbSrc: '/res/img/filler-v02.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x09.svg', thumbSrc: '/res/img/filler-x09.svg', alt: 'Lorem ipsum', aspectRatio: 0.75,  desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p05.svg', thumbSrc: '/res/img/filler-p05.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x10.svg', thumbSrc: '/res/img/filler-x10.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t04.svg', thumbSrc: '/res/img/filler-t04.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x13.svg', thumbSrc: '/res/img/filler-x13.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
        ],
      },
      {
        label: 'Adipiscing',
        images: [
          { src: '/res/img/filler-s04.svg', thumbSrc: '/res/img/filler-s04.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x11.svg', thumbSrc: '/res/img/filler-x11.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-p06.svg', thumbSrc: '/res/img/filler-p06.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-v03.svg', thumbSrc: '/res/img/filler-v03.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x12.svg', thumbSrc: '/res/img/filler-x12.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t05.svg', thumbSrc: '/res/img/filler-t05.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-v04.svg', thumbSrc: '/res/img/filler-v04.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x14.svg', thumbSrc: '/res/img/filler-x14.svg', alt: 'Lorem ipsum', aspectRatio: 1.0,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-t06.svg', thumbSrc: '/res/img/filler-t06.svg', alt: 'Lorem ipsum', aspectRatio: 0.8,   desktopOffset: 0, mobileOffset: 0 },
          { src: '/res/img/filler-x15.svg', thumbSrc: '/res/img/filler-x15.svg', alt: 'Lorem ipsum', aspectRatio: 0.667, desktopOffset: 0, mobileOffset: 0 },
        ],
      },
    ],
  },

  footer: {
    tagline: 'Consectetur adipiscing elit.',
    email: 'email@email.com',
  },
}
