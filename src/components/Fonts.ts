export interface CustomFont {
  id: string;
  name: string;
  category: 'Elegant' | 'Casual' | 'Ornate' | 'Modern';
  description: string;
  descriptionIt: string;
  importUrl: string;
}

export const FONTS: CustomFont[] = [
  {
    id: 'GreatVibes',
    name: 'Great Vibes',
    category: 'Elegant',
    description: 'Beautiful flowing wedding script font',
    descriptionIt: 'Fluido script elegante per matrimoni ed eventi',
    importUrl: 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'
  },
  {
    id: 'Sacramento',
    name: 'Sacramento',
    category: 'Modern',
    description: 'Thin, monoline calligraphic signature script',
    descriptionIt: 'Script sottile monolinea e calligrafico',
    importUrl: 'https://fonts.googleapis.com/css2?family=Sacramento&display=swap'
  },
  {
    id: 'DancingScript',
    name: 'Dancing Script',
    category: 'Casual',
    description: 'Lively, friendly cursive with custom bounce',
    descriptionIt: 'Corsivo vivace ed amichevole con rimbalzo',
    importUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap'
  },
  {
    id: 'AlexBrush',
    name: 'Alex Brush',
    category: 'Elegant',
    description: 'Smooth, brush-drawn classical script',
    descriptionIt: 'Script pennello liscio e classico',
    importUrl: 'https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap'
  },
  {
    id: 'PinyonScript',
    name: 'Pinyon Script',
    category: 'Elegant',
    description: 'Sophisticated cursive with high slant and contrast',
    descriptionIt: 'Corsivo sofisitcato molto inclinato e contrastato',
    importUrl: 'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap'
  },
  {
    id: 'Allura',
    name: 'Allura',
    category: 'Elegant',
    description: 'Stylized, fluid hand writing script',
    descriptionIt: 'Scrittura a mano molto fluida e stilizzata',
    importUrl: 'https://fonts.googleapis.com/css2?family=Allura&display=swap'
  },
  {
    id: 'MonsieurLaDoulaise',
    name: 'Monsieur La Doulaise',
    category: 'Ornate',
    description: 'Extremely ornate traditional vintage script',
    descriptionIt: 'Script tradizionale vintage riccamente ornato',
    importUrl: 'https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap'
  },
  {
    id: 'Rochester',
    name: 'Rochester',
    category: 'Ornate',
    description: 'Thick victorian style signature font',
    descriptionIt: 'Calligrafia spessa in stile vittoriano',
    importUrl: 'https://fonts.googleapis.com/css2?family=Rochester&display=swap'
  },
  {
    id: 'Parisienne',
    name: 'Parisienne',
    category: 'Elegant',
    description: 'Chic and classic French-inspired cursive',
    descriptionIt: 'Corsivo chic dal gusto classico parigino',
    importUrl: 'https://fonts.googleapis.com/css2?family=Parisienne&display=swap'
  },
  {
    id: 'Arizonia',
    name: 'Arizonia',
    category: 'Casual',
    description: 'Signmaking script with beautiful sweeping curves',
    descriptionIt: 'Script artistico con pennellate ampie e curve',
    importUrl: 'https://fonts.googleapis.com/css2?family=Arizonia&display=swap'
  },
  {
    id: 'MrsSaintDelafield',
    name: 'Mrs Saint Delafield',
    category: 'Ornate',
    description: 'Antique cursive script with dramatic loops',
    descriptionIt: 'Antico corsivo storico con occhielli drammatici',
    importUrl: 'https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap'
  },
  {
    id: 'ReenieBeanie',
    name: 'Reenie Beanie',
    category: 'Casual',
    description: 'Light-hearted, sketchy handwritten style',
    descriptionIt: 'Corsivo casuale, schizzato a penna sottile',
    importUrl: 'https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap'
  }
];

export const loadAllFonts = () => {
  FONTS.forEach(font => {
    const id = `gfont-${font.id}`;
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = font.importUrl;
      document.head.appendChild(link);
    }
  });
};
