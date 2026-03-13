# vertrag-erstellen.at — Projekt-Briefing für Claude Code

## Was ist das?

Ein kostenloser, mobiler KFZ-Kaufvertrag-Generator für Österreich mit AI-gestütztem Zulassungsschein-Scan. Der User fotografiert seinen Zulassungsschein, die AI liest die Fahrzeugdaten aus, und in unter 2 Minuten hat er einen fertigen PDF-Kaufvertrag am Handy.

Später wird das Projekt um weitere Vertragstypen erweitert (Mietvertrag, Kündigungsschreiben, Arbeitsvertrag, Vollmacht).

Das Projekt ist ein Lead-Generator für EVROBO (evrobo.dev), eine Software-Automatisierungs-Firma.

---

## Tech-Stack

- **Frontend:** React (Vite) mit Tailwind CSS
- **Deployment:** Netlify (via CLI oder MCP)
- **PDF-Generierung:** Client-seitig mit @react-pdf/renderer ODER serverseitig mit Puppeteer auf Hetzner (Boyko hat dort bereits einen Server mit Puppeteer-Microservice für den RE-Bot)
- **AI Zulassungsschein-Scan:** Anthropic Claude API (claude-sonnet-4-20250514) mit Vision — Bild als Base64 senden, JSON zurückbekommen
- **Analytics (optional):** Supabase oder Plausible
- **Kein Login, kein Backend für V1** — alles client-seitig außer der API-Call

---

## Seitenstruktur

```
vertrag-erstellen.at/
├── / (Startseite — Hero + Übersicht aller Vertragstypen)
├── /kfz-kaufvertrag (Hauptseite — Generator + SEO-Content)
├── /kaufvertrag (allgemeiner Kaufvertrag — Phase 2)
├── /mietvertrag (Phase 2)
├── /kuendigungsschreiben (Phase 2)
├── /arbeitsvertrag (Phase 2)
├── /vollmacht (Phase 2)
├── /impressum
├── /datenschutz
└── /agb
```

---

## MVP Scope: KFZ-Kaufvertrag (/kfz-kaufvertrag)

### User Flow (Mobile-First!)

1. User öffnet Seite am Handy
2. Sieht Hero: "KFZ Kaufvertrag in 60 Sekunden — Zulassungsschein scannen, fertig."
3. Zwei Optionen:
   - Button "Zulassungsschein scannen" → Kamera öffnet sich
   - Button "Manuell ausfüllen" → direkt zum Formular
4. Bei Scan: Foto wird gemacht → an Claude API gesendet → JSON kommt zurück
5. Formular ist vorausgefüllt mit Fahrzeugdaten
6. User ergänzt:
   - Verkäufer: Name, Adresse, Geburtsdatum (ggf. bereits aus Zulassungsschein)
   - Käufer: Name, Adresse, Geburtsdatum
   - Kaufpreis in EUR
   - Kilometerstand
   - Gewährleistungsausschluss ja/nein (Toggle)
   - Bekannte Mängel (Freitextfeld)
   - Zahlungsart (Bar / Überweisung)
   - Übergabedatum
7. Button "Vertrag erstellen"
8. PDF wird generiert und zum Download/Teilen angeboten
9. Optional: Unterschrift-Canvas (Touch-Signatur für beide Parteien)

### Claude API Vision Call

System Prompt für den Zulassungsschein-Scan:

```
Du bist ein Dokumenten-Scanner für österreichische Zulassungsscheine (Zulassungsbescheinigung Teil 1).

Extrahiere folgende Felder aus dem Bild und gib sie als JSON zurück:

{
  "kennzeichen": "(A) Amtliches Kennzeichen",
  "erstzulassung": "(B) Datum der Erstzulassung, Format: DD.MM.YYYY",
  "marke": "(D.1) Marke",
  "type": "(D.2) Type / Variante / Version",
  "handelsbezeichnung": "(D.3) Handelsbezeichnung",
  "fin": "(E) Fahrzeug-Identifizierungsnummer",
  "gesamtmasse": "(F.1) Technisch zulässige Gesamtmasse in kg",
  "eigengewicht": "(G) Masse des in Betrieb befindlichen Fahrzeugs in kg",
  "fahrzeugklasse": "(J) Fahrzeugklasse",
  "hubraum": "(P.1) Hubraum in cm³",
  "leistung_kw": "(P.2) Nennleistung in kW",
  "kraftstoff": "(P.3) Kraftstoffart",
  "farbe": "(R) Farbe des Fahrzeugs",
  "sitzplaetze": "(S.1) Sitzplätze einschließlich Fahrersitz",
  "co2": "(V.7) CO2-Emissionen in g/km",
  "zulassungsbesitzer_name": "(C.1) Name oder Firmenbezeichnung des Zulassungsbesitzers",
  "zulassungsbesitzer_adresse": "(C.1) Adresse des Zulassungsbesitzers"
}

Wenn ein Feld nicht lesbar ist, setze den Wert auf null.
Gib NUR das JSON zurück, keinen weiteren Text.
```

### PDF-Inhalt (Kaufvertrag-Template)

Der generierte KFZ-Kaufvertrag muss folgende Inhalte haben:

```
KAUFVERTRAG
über ein gebrauchtes Kraftfahrzeug

Abgeschlossen zwischen:

VERKÄUFER:
Name: [aus Formular]
Adresse: [aus Formular]
Geburtsdatum: [aus Formular]

KÄUFER:
Name: [aus Formular]
Adresse: [aus Formular]
Geburtsdatum: [aus Formular]

FAHRZEUG:
Marke/Type: [aus Scan/Formular]
Handelsbezeichnung: [aus Scan/Formular]
Fahrgestell-Nr. (FIN): [aus Scan/Formular]
Amtl. Kennzeichen: [aus Scan/Formular]
Erstzulassung: [aus Scan/Formular]
Kilometerstand: [aus Formular]
Hubraum: [aus Scan] cm³
Leistung: [aus Scan] kW
Kraftstoff: [aus Scan]
Farbe: [aus Scan]

KAUFPREIS: EUR [aus Formular]
Zahlungsart: [Bar/Überweisung]

GEWÄHRLEISTUNG:
[Wenn ausgeschlossen:]
"Der Verkäufer verkauft das Fahrzeug im gebrauchten Zustand, wie besichtigt und Probe gefahren. Die Gewährleistung wird im Rahmen der gesetzlichen Möglichkeiten ausgeschlossen. Dies gilt nicht bei arglistigem Verschweigen von Mängeln."

[Wenn nicht ausgeschlossen:]
"Es gelten die gesetzlichen Gewährleistungsbestimmungen gemäß §§ 922 ff ABGB."

BEKANNTE MÄNGEL:
[aus Formular, oder "Keine bekannten Mängel angegeben."]

Der Verkäufer bestätigt:
- Eigentümer des Fahrzeugs zu sein und frei darüber verfügen zu können
- Das Fahrzeug ist frei von Rechten Dritter (kein Pfandrecht, kein Leasing, kein Eigentumsvorbehalt)
- Der angegebene Kilometerstand ist nach bestem Wissen korrekt

Die Übergabe des Fahrzeugs erfolgt am: [aus Formular]
Der Kaufpreis wurde bei Übergabe vollständig bezahlt.

Mit Übergabe gehen Besitz, Gefahr und Nutzen auf den Käufer über.

Ort, Datum: ________________

________________________          ________________________
Unterschrift Verkäufer               Unterschrift Käufer
```

---

## Design-Anforderungen

### Mobile-First
- Die App wird primär am Handy verwendet (beim Auto stehen, Vertrag machen)
- Touch-optimiert: große Buttons, große Input-Felder
- Kamera-Integration für Zulassungsschein-Scan
- PDF muss am Handy gut lesbar sein und via Share-Sheet teilbar (WhatsApp, Mail, AirDrop)

### Look & Feel
- Modern, clean, vertrauenswürdig (es geht um Verträge/Geld)
- Farben: Dunkelblau/Weiß als Primärfarben, Grün für CTAs
- Keine verspielten Animationen — seriös und schnell
- EVROBO-Branding dezent im Footer: "Ein Projekt von EVROBO · evrobo.dev"
- Österreich-Bezug: "Speziell für österreichisches Recht" als Trust-Signal

### SEO-Elemente pro Seite
- Meta Title: max 60 Zeichen, Hauptkeyword vorne
- Meta Description: max 155 Zeichen, Call-to-Action
- H1 mit Hauptkeyword
- Strukturierter Content unterhalb des Tools (800-1500 Wörter)
- FAQ-Section mit Schema.org FAQPage Markup
- Breadcrumbs mit Schema.org BreadcrumbList
- Open Graph Tags für Social Sharing

---

## SEO-Content für /kfz-kaufvertrag

### Meta Tags
```html
<title>KFZ Kaufvertrag erstellen — Gratis Generator mit Zulassungsschein-Scan | Österreich 2026</title>
<meta name="description" content="KFZ Kaufvertrag in 60 Sekunden erstellen. Zulassungsschein scannen, Daten automatisch ausfüllen, PDF downloaden. Kostenlos, für Österreich." />
```

### SEO-Text (unterhalb des Tools)

Themen die abgedeckt werden müssen:
- Was muss in einem KFZ-Kaufvertrag in Österreich stehen?
- Gewährleistung vs. Garantie beim Autokauf (§§ 922 ff ABGB)
- Gewährleistungsausschluss zwischen Privatpersonen
- Worauf beim Gebrauchtwagenkauf achten?
- Fahrzeug abmelden/ummelden nach dem Kauf
- Welche Dokumente braucht man beim Autoverkauf?
- NoVA und Versicherung beim Fahrzeugwechsel

### FAQ-Section (mit Schema Markup)
- "Ist ein mündlicher Kaufvertrag gültig?" → Ja, aber schriftlich empfohlen
- "Muss der Kaufvertrag notariell beglaubigt werden?" → Nein, bei KFZ nicht nötig
- "Kann ich die Gewährleistung beim Privatverkauf ausschließen?" → Ja, zwischen Privaten möglich
- "Welche Daten brauche ich für den KFZ-Kaufvertrag?" → Zulassungsschein + Personalausweis beider Parteien
- "Was passiert wenn der Kilometerstand manipuliert wurde?" → Arglist, Gewährleistungsausschluss greift nicht

---

## Rechtliche Seiten

### /datenschutz
Muss enthalten:
- Verantwortlicher: EVROBO (Boyko Dimitrov, Wien)
- Welche Daten werden verarbeitet: Bild des Zulassungsscheins, eingegebene Formulardaten
- Drittanbieter: Anthropic (Claude API) für Bildanalyse — Sitz in USA, DPA vorhanden, EU Standard Contractual Clauses
- Keine Speicherung: Bilder und Daten werden nicht gespeichert, nach PDF-Generierung gelöscht
- Keine Cookies (oder nur technisch notwendige)
- Rechte der Betroffenen nach DSGVO Art. 15-22
- Kontakt Datenschutzbehörde Österreich

### /impressum
Standard österreichisches Impressum nach ECG/UGB:
- EVROBO (Boyko Dimitrov)
- Adresse Wien
- Kontakt
- UID, Firmenbuch wenn vorhanden
- Hinweis: "Keine Rechtsberatung — Vorlagen sind unverbindliche Muster"

### Disclaimer (auf jeder Vertragsseite)
```
Hinweis: Die auf vertrag-erstellen.at bereitgestellten Vorlagen und generierten 
Dokumente sind unverbindliche Muster und ersetzen keine individuelle Rechtsberatung. 
Für die Richtigkeit und Vollständigkeit wird keine Haftung übernommen. Bei komplexen 
Sachverhalten empfehlen wir die Konsultation eines Rechtsanwalts.
```

---

## Consent-Flow für Zulassungsschein-Scan

Vor dem Upload muss ein Consent-Dialog erscheinen:

```
"Um Ihren Zulassungsschein zu scannen, wird das Foto an einen 
KI-Dienst (Anthropic/Claude) zur Texterkennung übermittelt. 
Das Bild wird ausschließlich zur Datenextraktion verwendet 
und weder gespeichert noch für andere Zwecke genutzt.

☑ Ich stimme der Verarbeitung meines Zulassungsscheins zu.

[Weiter] [Abbrechen]
"
```

---

## Technische Details

### React-Projekt Setup
```bash
npm create vite@latest vertrag-erstellen -- --template react
cd vertrag-erstellen
npm install tailwindcss @tailwindcss/vite react-router-dom
npm install @react-pdf/renderer  # für client-seitige PDF-Generierung
```

### Umgebungsvariablen
```env
VITE_ANTHROPIC_API_KEY=sk-ant-...  # Claude API Key
```

WICHTIG: Der API-Key darf NICHT im Frontend exponiert werden!
Lösung: Entweder Netlify Function als Proxy, oder ein kleiner Express-Endpoint auf Hetzner.

### Netlify Function als API-Proxy (/netlify/functions/scan-zulassungsschein.js)
```javascript
// Nimmt Base64-Bild entgegen, ruft Claude API auf, gibt JSON zurück
// So bleibt der API-Key serverseitig
export default async function handler(req) {
  const { image_base64 } = JSON.parse(req.body);
  
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: image_base64
            }
          },
          {
            type: "text",
            text: "Extrahiere aus diesem österreichischen Zulassungsschein alle Felder als JSON..."
          }
        ]
      }]
    })
  });
  
  const data = await response.json();
  return new Response(JSON.stringify(data.content[0].text), {
    headers: { "Content-Type": "application/json" }
  });
}
```

### Signature Canvas Component
Für die Touch-Unterschrift auf Mobile ein einfaches Canvas-Element:
- Finger-/Touch-Events tracken
- Als PNG exportieren
- In PDF einbetten

---

## Deployment

- Netlify via CLI oder MCP Server
- Domain: vertrag-erstellen.at
- DNS: Netlify DNS oder Cloudflare (Boyko hat beides)
- SSL: automatisch via Netlify

---

## Phase 2 Erweiterungen (nach MVP)

1. Weitere Vertragstypen (Mietvertrag, Kündigung, Arbeitsvertrag, Vollmacht)
2. Allgemeiner Kaufvertrag (nicht-KFZ)
3. Blog/Ratgeber-Bereich für SEO-Content
4. PWA (installierbar am Homescreen)
5. Offline-Modus (Formular offline ausfüllen, PDF generieren wenn wieder online)
6. Multi-Language (Deutsch/Englisch/Türkisch/BKS für Österreichs Demografie)
7. QR-Code auf dem PDF der zum digitalen Vertrag verlinkt

---

## Zusammenfassung

Bau eine Mobile-First React App die:
1. Modern und vertrauenswürdig aussieht
2. Einen KFZ-Kaufvertrag über ein Step-Wizard-Formular erstellt
3. Optional den Zulassungsschein per Kamera scannt und via Claude API die Daten extrahiert
4. Ein sauberes PDF generiert das am Handy teilbar ist
5. SEO-optimiert ist mit Meta Tags, Schema Markup und Content
6. Auf Netlify deployed wird
7. DSGVO-konform ist mit Consent-Flow und Datenschutzerklärung
