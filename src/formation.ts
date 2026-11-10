export type Team = "left" | "right"

export interface Slot {
  id: string
  team: Team
  /** normalized 0..1 coordinates relative to the pitch */
  x: number
  y: number
}

/**
 * Fixed positions for a 7-a-side match: two mirrored teams, each laid out in
 * 5 lines following a 1-2-1-2-1 shape (7 players per team, 14 total).
 */
const TOP = 0.28
const BOTTOM = 0.72
const MID = 0.5

const LEFT_X = [0.055, 0.16, 0.265, 0.38, 0.455]
const RIGHT_X = [0.945, 0.84, 0.735, 0.62, 0.545]

export const SLOTS: Slot[] = [
  // Left team
  { id: "L1", team: "left", x: LEFT_X[0], y: MID },
  { id: "L2a", team: "left", x: LEFT_X[1], y: TOP },
  { id: "L2b", team: "left", x: LEFT_X[1], y: BOTTOM },
  { id: "L3", team: "left", x: LEFT_X[2], y: MID },
  { id: "L4a", team: "left", x: LEFT_X[3], y: TOP },
  { id: "L4b", team: "left", x: LEFT_X[3], y: BOTTOM },
  { id: "L5", team: "left", x: LEFT_X[4], y: MID },

  // Right team (mirrored)
  { id: "R1", team: "right", x: RIGHT_X[0], y: MID },
  { id: "R2a", team: "right", x: RIGHT_X[1], y: TOP },
  { id: "R2b", team: "right", x: RIGHT_X[1], y: BOTTOM },
  { id: "R3", team: "right", x: RIGHT_X[2], y: MID },
  { id: "R4a", team: "right", x: RIGHT_X[3], y: TOP },
  { id: "R4b", team: "right", x: RIGHT_X[3], y: BOTTOM },
  { id: "R5", team: "right", x: RIGHT_X[4], y: MID },
]
