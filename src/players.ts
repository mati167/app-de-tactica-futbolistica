import type { Player } from "./types"

/** Neutral dark silhouette used when a player has no uploaded photo. */
export const SILHOUETTE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <rect width='100' height='100' fill='#2c2c2c'/>
      <circle cx='50' cy='40' r='17' fill='#5a5a5a'/>
      <path d='M18 94 C18 70 82 70 82 94 Z' fill='#5a5a5a'/>
    </svg>`,
  )

export const DEFAULT_PLAYERS: Player[] = [
  { id: "p1", name: "MATIAS", photo: "" },
  { id: "p2", name: "CHINO", photo: "" },
  { id: "p3", name: "FOCKA", photo: "" },
  { id: "p4", name: "JULI", photo: "" },
  { id: "p5", name: "LUCAS", photo: "" },
  { id: "p6", name: "PAPELITO", photo: "" },
  { id: "p7", name: "NAHUEL", photo: "" },
  { id: "p8", name: "ELIAS", photo: "" },
  { id: "p9", name: "FER", photo: "" },
  { id: "p10", name: "MAURO", photo: "" },
  { id: "p11", name: "DIEGO", photo: "" },
  { id: "p12", name: "VOLTA", photo: "" },
  { id: "p13", name: "LUIGUI", photo: "" },
  { id: "p14", name: "NICO2", photo: "" },
]
