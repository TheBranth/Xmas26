# Operazione Notte Silenziosa 🎄
### Web-App Companion Real-Time per One-Shot GDR Natalizia

Web-app companion ad alta fedeltà con sincronizzazione real-time tramite **PartyKit** (WebSocket edge persistenti in memoria) e frontend **Next.js 16 + Tailwind CSS + Framer Motion**, pronta per il deploy su **Vercel**.

---

## 🎨 Stile Visivo & Regole di Design
- **Libro delle favole anni '80:** tonalità pastello sfumate, grana della carta retro e atmosfera natalizia nostalgica.
- **Silhouette nere ad alto contrasto in sottofondo:** teatro delle ombre / papercut sui fondali pastello.
- **Zero Muri di Testo:** a schermo per i giocatori compaiono unicamente l'illustrazione della scena e il titolo del capitolo. La narrazione è gestita interamente a voce dal Master.

---

## 🚀 Architettura & Funzionalità

### 1. Lobby Pre-Partita (`status: "LOBBY"`)
- **4 Archetipi Ufficiali:**
  1. *Il Secchione* (Cervello 3, Prontezza 2, Faccia Tosta 2, Muscoli 1)
  2. *Il Palestrato* (Muscoli 3, Prontezza 2, Faccia Tosta 2, Cervello 1)
  3. *La Squinza* (Faccia Tosta 3, Prontezza 2, Cervello 2, Muscoli 1)
  4. *Il Maranza* (Prontezza 3, Faccia Tosta 2, Muscoli 2, Cervello 1)
- **Lock Esclusivo & Kick-Out Istantaneo:** Se due giocatori ispezionano la stessa scheda e il primo clicca *"Prendi questo Personaggio"*, l'altro riceve una notifica toast istantanea e viene rimandato alla lista principale.
- **Rilascio Scheda:** Possibilità di deselezionare la scheda in qualsiasi momento.
- **Controlli Master:** Visualizzazione in tempo reale di chi ha preso quale scheda, tasto di reset forzato e pulsante *"Avvia Avventura"*.

### 2. Partita Attiva (`status: "ACTIVE"`)
- **Vista Giocatore (Layout Mobile Verticale senza scroll):**
  - **Stage Visivo (Top 35-40%):** Illustrazione pastello della Scena Attiva con silhouette nere + neve in caduta Canvas + Titolo Scena + Contatore *Biscotti del Cringe*.
  - **Scheda & Selettore Tiro (Middle 45%):** 4 Bottoni Statistiche, 3 pillole Specialità (+1d6), 3 pillole Tratti Negativi (-1d6 con badge illuminato *"Guadagni 1 Biscotto!"*), promemoria Oggetto Iconico.
  - **Barra Azione (Bottom 15-20%):** Tasto rapido *"Brucia 1 Biscotto"* (+1d6) e Tasto gigante *"TIRA X d6"*.
- **Vista Master (Console di Regia su `/master` o toggle):**
  - **Selettore Scene Rapido:** Tutte le 11 scene ufficiali + Scena 98 Jolly (*"Il Master sta improvvisando"*). Proiezione istantanea su tutti i dispositivi.
  - **Scena 99 (Input URL Dinamico):** Possibilità di incollare un URL immagine + Titolo al volo, con toggle *Filtro Pastello Anni '80* (CSS sepia/contrast/vignette).
  - **Orologio del Disastro (6 spicchi):** Controllo visivo della digestione di Babbo Natale da 0 a 6.
  - **Dispenser Biscotti:** Aggiunta e rimozione manuale di Biscotti del Cringe (+1/-1) per ciascun giocatore.
  - **Attiva Cintura di Babbo Natale:** Pescata con animazione a schermo di oggetto assurdo + penitenza cringe dal vivo da far fare al giocatore.

### 3. Motore di Tiro Dadi
- Formula automatica: $\text{Dadi} = \text{Statistica} \pm \text{Specialità/Tratto} + \text{Biscotti}$ (minimo 1d6).
- Risoluzione grafica globale:
  - `4-5` = Verde (Successo)
  - `6` = Oro lucido con bagliore (Successo Critico con Stile)
  - `1` (con malus attivo) = Rosso allarme (Disastro Comico / Complicazione Imbarazzante)
- Sintetizzatore audio procedurale con Web Audio API (zero asset MP3 esterni richiesti).

---

## 🛠️ Avvio in Locale

### 1. Installa le dipendenze
```bash
npm install
```

### 2. Avvia il server PartyKit (in un terminale)
```bash
npm run party:dev
```
Il server PartyKit risponderà su `http://localhost:1999` gestendo i WebSocket e lo stato in memoria.

### 3. Avvia l'app Next.js (in un secondo terminale)
```bash
npm run dev
```
Apri l'app su `http://localhost:3000`.

> **Nota:** L'app include un sistema di fallback locale: se PartyKit non è ancora avviato, l'interfaccia continua a funzionare fluidamente in locale per test immediati.

---

## 🚢 Deploy su Vercel e PartyKit Cloud

1. **Deploy del Server PartyKit:**
   ```bash
   npx partykit deploy
   ```
   Ti verrà fornito un host del tipo `operazione-notte-silenziosa.<tuo-username>.partykit.dev`.

2. **Deploy su Vercel:**
   - Collega il repository GitHub su Vercel.
   - Nelle Environment Variables di Vercel, imposta:
     ```env
     NEXT_PUBLIC_PARTYKIT_HOST=operazione-notte-silenziosa.<tuo-username>.partykit.dev
     ```
   - Esegui il deploy. I giocatori si collegheranno al link mobile principale e il Master potrà aprire `/master` da tablet o laptop!
