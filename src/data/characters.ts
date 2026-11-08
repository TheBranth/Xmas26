import { Character } from "@/types/game";

export const CHARACTERS: Character[] = [
  {
    id: "secchione",
    name: "Il Secchione",
    subtitle: "Il Cervello Tattico del Gruppo",
    silhouetteDesc: "Ragazzo curvo con occhiali spessi che riflettono la luce, zaino enorme sulle spalle, felpa con cappuccio.",
    stats: {
      cervello: 3,
      prontezza: 2,
      facciaTosta: 2,
      muscoli: 1,
    },
    specialties: [
      "Manuale d'Istruzioni",
      "Calcolo Balistico",
      "Chimica da Cucina",
    ],
    negativeTraits: [
      "Fobia Sociale",
      "Costituzione di Carta",
      "Overthinking Paralizzante",
    ],
    iconicItem: "Puntatore laser astronomico e rotolo di nastro americano.",
    imagePath: "/characters/secchione.webp",
    colorScheme: {
      primary: "from-blue-700 to-indigo-900",
      border: "border-blue-400/40",
      badge: "bg-blue-900/60 text-blue-200 border-blue-400/30",
    },
  },
  {
    id: "palestrato",
    name: "Il Palestrato",
    subtitle: "Forza Bruta & Posa Plastica",
    silhouetteDesc: "Spalle larghe il doppio della porta, canottiera anche a -5°C, shaker in mano, posa plastica costante.",
    stats: {
      muscoli: 3,
      prontezza: 2,
      facciaTosta: 2,
      cervello: 1,
    },
    specialties: [
      "Stacco da Terra",
      "Bro-Code",
      "Metabolismo da Bufalo",
    ],
    negativeTraits: [
      "Delicatezza Zero",
      "Ipoglicemia da Sforzo",
      "Zero Concetti Astratti",
    ],
    iconicItem: "Shaker pieno di pre-workout fluorescente di dubbia legalità.",
    imagePath: "/characters/palestrato.webp",
    colorScheme: {
      primary: "from-amber-700 to-red-900",
      border: "border-amber-400/40",
      badge: "bg-amber-900/60 text-amber-200 border-amber-400/30",
    },
  },
  {
    id: "squinza",
    name: "La Squinza",
    subtitle: "Glamour, Manipolazione & Lacca",
    silhouetteDesc: "Pellicciotto sintetico, stivali col tacco improponibili sulla neve, smartphone perennemente alzato a cercare campo/luce giusta.",
    stats: {
      facciaTosta: 3,
      prontezza: 2,
      cervello: 2,
      muscoli: 1,
    },
    specialties: [
      "Gaslighting Tattico",
      "Radar Gerarchia Sociale",
      "MacGyver Cosmetico",
    ],
    negativeTraits: [
      "Drama Queen",
      "Allergia allo Sporco",
      "Sindrome da Protagonista",
    ],
    iconicItem: "Accendino griffato e bomboletta XXL di lacca extra-forte.",
    imagePath: "/characters/squinza.webp",
    colorScheme: {
      primary: "from-pink-700 to-purple-900",
      border: "border-pink-400/40",
      badge: "bg-pink-900/60 text-pink-200 border-pink-400/30",
    },
  },
  {
    id: "maranza",
    name: "Il Maranza",
    subtitle: "Riflessi da Strada & Borsello Tattico",
    silhouetteDesc: "Piumino lucido smanicato, borsello a tracolla, cappuccio calato, postura da chi sta per rubarti i tergicristalli.",
    stats: {
      prontezza: 3,
      facciaTosta: 2,
      muscoli: 2,
      cervello: 1,
    },
    specialties: [
      "Guida Ignorante",
      "Mano Lesta",
      "Parkour da Condominio",
    ],
    negativeTraits: [
      "Provocazione Facile",
      "Paranoia da Sbirri",
      "Fascino della Cazzata",
    ],
    iconicItem: "Cassa Bluetooth con bassi distorsivi e coltellino multiuso \"trovato per terra\".",
    imagePath: "/characters/maranza.webp",
    colorScheme: {
      primary: "from-emerald-700 to-teal-900",
      border: "border-emerald-400/40",
      badge: "bg-emerald-900/60 text-emerald-200 border-emerald-400/30",
    },
  },
];

export const STAT_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  muscoli: { label: "Muscoli", icon: "💪", desc: "Forza bruta, resistenza e sfondamento porte" },
  cervello: { label: "Cervello", icon: "🧠", desc: "Ragionamento, logica, scienza e deduzione" },
  facciaTosta: { label: "Faccia Tosta", icon: "🕶️", desc: "Carisma, bluff, negoziazione e spudoratezza" },
  prontezza: { label: "Prontezza", icon: "⚡", desc: "Riflessi, destrezza, fuga e reattività" },
};
