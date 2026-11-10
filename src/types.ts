export interface Player {
  id: string
  name: string
  /** data URL or remote URL for the player photo. Empty string uses the default silhouette. */
  photo: string
}

/** Maps a slot id (see formation.ts) to the player id assigned to it. */
export type Assignments = Record<string, string>
