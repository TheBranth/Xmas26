import { GameScene } from "@/types/game";

export const SCENES: GameScene[] = [
  // --- FASE 1: OPERAZIONE TAPPO D'ORO ---
  {
    id: "1.1",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "La Porta di Avernus",
    imagePath: "/scenes/1_1_bagno_avernus.webp",
    silhouetteNote:
      "I quattro eroi in penombra davanti alla porta del bagno che fuma verde; la cintura a terra",
    gmNotes:
      "🎯 Babbo Natale è barricato nel bagno tra spasmi e vapori mefitici. A terra ci sono i pantaloni con la Cintura Magica. OBIETTIVO: Trovare l'Imodium prima che finisca la notte. Babbo urla dal water se bussano.",
  },
  {
    id: "1.2",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "Le Renne sul Tetto",
    imagePath: "/scenes/1_2_tetto_renne.webp",
    silhouetteNote:
      "La slitta inclinata sul cornicione innevato; sagoma maestosa di Rudolph che fissa i ragazzi spuntati dal lucernario",
    gmNotes:
      "🎯 Rudolph e le 4 renne sono parcheggiate in bilico sul cornicione del tetto. Hanno fame atavica e guardano i ragazzi dall'alto in basso. Serve corromperle con snack o mostrare polso con Muscoli/Faccia Tosta.",
  },
  {
    id: "1.3",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "La Farmacia Sprangata",
    imagePath: "/scenes/1_3_farmacia_chiusa.webp",
    silhouetteNote:
      "Strada deserta, lampione giallo a pastello, croce verde spenta; ombre che armeggiano vicino alla serranda",
    gmNotes:
      "🎯 Farmacia chiusa per ferie natalizie con serranda blindata. C'è il distributore automatico 24h e la finestrella urgenze. Libera improvvisazione: scasso col Maranza, hack col Secchione o cintura magica.",
  },
  {
    id: "1.4",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "Il Balcone di Giongiorgio",
    imagePath: "/scenes/1_4_dottor_giongiorgio.webp",
    silhouetteNote:
      "Finestra al primo piano illuminata con il dottore in vestaglia che urla; silhouette dei ragazzi sul marciapiede",
    gmNotes:
      "🎯 Il Dottor Giongiorgio si affaccia in vestaglia scozzese e bigodini, furioso per il baccano notturno. Minaccia il 112. I ragazzi devono intenerirlo con Faccia Tosta o inventare una finta colica d'urgenza.",
  },
  {
    id: "1.5",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "Volo a Mach 3 Verso Est",
    imagePath: "/scenes/1_5_volo_slitta.webp",
    silhouetteNote:
      "La slitta sfreccia tra le nuvole rosa e blu notte a tutta velocità verso l'orizzonte",
    gmNotes:
      "🎯 Le renne partono a fionda superando la barriera del suono! Vento polare sulle ciglia, forza G mostruosa tra nuvole rosa e viola. Prova di Prontezza o Muscoli per non scivolare fuori bordo.",
  },
  {
    id: "1.6",
    phase: 1,
    phaseTitle: "Fase 1: Tappo d'Oro",
    title: "L'Assedio della Signora Marisa",
    imagePath: "/scenes/1_6_signora_marisa.webp",
    silhouetteNote:
      "Il pianerottolo del condominio; ombra minacciosa dell'amministratrice con ciabatte e registro alla porta",
    gmNotes:
      "⚠️ La Signora Marisa (amministratrice del palazzo) blocca le scale armata di registro condominiale e ciabatte. Minaccia querele penali per vibrazioni sul tetto e disturbo del riposo alle 01:30 di notte!",
  },

  // --- FASE 2: POLO NORD & SCIOPERO ELFICO ---
  {
    id: "2.1",
    phase: 2,
    phaseTitle: "Fase 2: Il Polo Nord",
    title: "Babbo Natale Sottozero",
    imagePath: "/scenes/2_1_babbo_ghiacciato.webp",
    silhouetteNote:
      "Salotto di casa con il Babbo congelato in un blocco di ghiaccio; i quattro che lo fissano allibiti",
    gmNotes:
      "🎯 Il freddo polare scaturito dall'Avernus ha trasformato Babbo in una statua di ghiaccio sul water! È privo di sensi. I ragazzi capiscono che tocca a loro consegnare i regali rimasti.",
  },
  {
    id: "2.2",
    phase: 2,
    phaseTitle: "Fase 2: Il Polo Nord",
    title: "Rotte Polari & Aurora Boreale",
    imagePath: "/scenes/2_2_aurora_polare.webp",
    silhouetteNote:
      "La slitta attraversa fasci verdi e viola d'aurora boreale su distese di banchisa artica",
    gmNotes:
      "🎯 Navigazione aerea sul circolo polare artico sotto fasci d'aurora boreale. Senza Babbo alla guida il GPS magico impazzisce: serve il Secchione per calcolare le coordinate stellari o il Maranza per correggere la rotta.",
  },
  {
    id: "2.3",
    phase: 2,
    phaseTitle: "Fase 2: Il Polo Nord",
    title: "Freddo Cane (-45°C)",
    imagePath: "/scenes/2_3_sopravvivenza_freddo.webp",
    silhouetteNote:
      "I quattro eroi impacchettati in piumoni Ikea, teli termici e sacchi della spazzatura che tremano a bordo",
    gmNotes:
      "⚠️ Temperatura a -45°C: il Palestrato flette i bicipiti nudi contro il gelo, la Squinza si avvolge nei piumoni, il Maranza trema in un sacco nero. Tiro di Muscoli per non subire complicazioni da assideramento!",
  },
  {
    id: "2.4",
    phase: 2,
    phaseTitle: "Fase 2: Il Polo Nord",
    title: "Il Picchetto del Sindacato Elfico",
    imagePath: "/scenes/2_4_sindacato_elfi.webp",
    silhouetteNote:
      "I cancelli brutalisti della Fabbrica di Giocattoli; sagome di elfi incrociati con cartelli di sciopero",
    gmNotes:
      "🎯 Cancelli della Fabbrica sbarrati con catene: gli elfi scioperano intorno a un bidone infuocato: 'Basta orari da fiaba, vogliamo i buoni pasto!'. Serve una trattativa diplomatica (Faccia Tosta) o un diversivo tattico.",
  },

  // --- FASE 3: CONSEGNE SPECIALI ---
  {
    id: "3.1",
    phase: 3,
    phaseTitle: "Fase 3: Consegne Speciali",
    title: "Il Bunker dell'Oligarca",
    imagePath: "/scenes/3_1_villa_bunker.webp",
    silhouetteNote:
      "Villa ultramoderna con torrette laser e telecamere; le ombre che strisciano sul prato innevato",
    gmNotes:
      "🎯 Consegna per il figlio viziato di un oligarca: villa iper-tecnologica con telecamere 360°, fari alogeni e laser sul prato innevato. Bisogna piazzare il pacco sotto l'albero senza far scattare la sirena blindata.",
  },
  {
    id: "3.2",
    phase: 3,
    phaseTitle: "Fase 3: Consegne Speciali",
    title: "Il Comignolo da Stufa a Pellet",
    imagePath: "/scenes/3_2_comignolo_stretto.webp",
    silhouetteNote:
      "Tetto moderno con tubicino minuscolo; i ragazzi che cercano di comprimere un triciclo gigante",
    gmNotes:
      "🎯 Niente camino classico: sul tetto c'è solo un tubo da stufa a pellet largo 8 cm! Il regalo da recapitare è un triciclo a pedali gigante con fiocco. Serve MacGyver Cosmetico, smontaggio balistico o un'idea folle dalla cintura.",
  },
  {
    id: "3.3",
    phase: 3,
    phaseTitle: "Fase 3: Consegne Speciali",
    title: "L'Imboscata del Moccioso TikToker",
    imagePath: "/scenes/3_3_bambino_insonne.webp",
    silhouetteNote:
      "Salotto buio rischiarato dalle luci dell'albero; ombra di un bambino armato di mazza e smartphone pronto al vlog",
    gmNotes:
      "⚠️ Salotto al buio: un moccioso di 8 anni è appostato dietro l'albero con mazza da baseball e smartphone in live streaming: 'Ho beccato gli aiutanti di Babbo in 4K!'. Neutralizzarlo o comprarne il silenzio prima che vada virale!",
  },

  // --- FASE 4: IL PLOT TWIST FINALE ---
  {
    id: "4.1",
    phase: 4,
    phaseTitle: "Fase 4: Epilogo",
    title: "Ritorno all'Alba",
    imagePath: "/scenes/4_1_ritorno_alba.webp",
    silhouetteNote:
      "Salotto all'alba con il ghiaccio che si scioglie e i quattro eroi distrutti e coperti di fuliggine",
    gmNotes:
      "🎯 Rientro all'appartamento alle 06:45 con la slitta fumante e i ragazzi esausti e neri di fuliggine. Il blocco di ghiaccio in bagno si sta sciogliendo e gocciola vistosamente: Babbo sta per risvegliarsi!",
  },
  {
    id: "4.2",
    phase: 4,
    phaseTitle: "Fase 4: Epilogo",
    title: "La Controburla di Natale!",
    imagePath: "/scenes/4_2_controburla.webp",
    silhouetteNote:
      "Babbo Natale che ride sornione tenendo in mano il piatto col post-it; armadietto del bagno aperto con l'Imodium lì presente",
    gmNotes:
      "💡 Babbo esce dal bagno trionfante sgranocchiando biscotti: nell'armadietto c'era già una scorta industriale di Imodium! Tutta la notte era una prova del fuoco per testare il loro spirito natalizio.",
  },
  {
    id: "4.3",
    phase: 4,
    phaseTitle: "Fase 4: Epilogo",
    title: "Buon Natale, Pagliacci!",
    imagePath: "/scenes/4_3_fuga_finale.webp",
    silhouetteNote:
      "La slitta vola via all'orizzonte mentre la porta di casa vola via sotto i colpi di mazza dell'amministratore",
    gmNotes:
      "🎉 La Signora Marisa sfonda la porta con un battiscopa brandito a due mani. Babbo e i ragazzi saltano sul cornicione e la slitta decolla all'alba nel cielo dorato al grido: 'BUON NATALE, PAGLIACCI!'",
  },

  // --- JOLLY & EMERGENZE ---
  {
    id: "98",
    phase: 99,
    phaseTitle: "Jolly",
    title: "Il Master Sta Improvvisando...",
    imagePath: "/scenes/98_improvvisazione.webp",
    silhouetteNote:
      "Un punto interrogativo gigante dorato o una renna che fissa perplessa il vuoto cosmico a pastello",
    gmNotes:
      "🃏 Il Master si è incartato o i giocatori hanno fatto una scelta completamente fuori traccia. Fai tirare dadi a caso, bevi un goccio di spumante e inventa una complicazione assurda!",
  },
  {
    id: "99",
    phase: 99,
    phaseTitle: "Jolly",
    title: "Scena Estemporanea (URL)",
    imagePath: "",
    silhouetteNote: "Immagine personalizzata fornita al volo dal Master",
    gmNotes:
      "🖼️ Proietta qualsiasi immagine da web incollando l'URL e attivando/disattivando il filtro pastello anni '80.",
  },
];

export const PHASES = [
  { id: 1, label: "Fase 1: Tappo d'Oro", shortLabel: "Fase 1: Tappo", color: "from-amber-600 to-amber-700" },
  { id: 2, label: "Fase 2: Il Polo Nord", shortLabel: "Fase 2: Polo Nord", color: "from-sky-600 to-blue-700" },
  { id: 3, label: "Fase 3: Consegne Speciali", shortLabel: "Fase 3: Consegne", color: "from-emerald-600 to-teal-700" },
  { id: 4, label: "Fase 4: Epilogo", shortLabel: "Fase 4: Finale", color: "from-purple-600 to-pink-700" },
  { id: 99, label: "Jolly & Emergenze", shortLabel: "⚠️ Jolly", color: "from-rose-600 to-amber-600" },
];
