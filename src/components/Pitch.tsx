import { forwardRef } from "react"
import type { Player, Assignments } from "../types"
import { SILHOUETTE } from "../players"
import { SLOTS } from "../formation"
import Field from "./Field"

interface PitchProps {
  assignments: Assignments
  players: Map<string, Player>
  onAssign: (slotId: string, playerId: string) => void
  onClearSlot: (slotId: string) => void
}

const Pitch = forwardRef<HTMLDivElement, PitchProps>(function Pitch(
  { assignments, players, onAssign, onClearSlot },
  ref,
) {
  return (
    <div ref={ref} className="pitch">
      <Field />

      {SLOTS.map((slot) => {
        const playerId = assignments[slot.id]
        const player = playerId ? players.get(playerId) : undefined
        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault()
          const droppedId = e.dataTransfer.getData("text/plain")
          if (droppedId) onAssign(slot.id, droppedId)
        }

        return (
          <div
            key={slot.id}
            className={`slot slot-${slot.team} ${player ? "is-filled" : "is-empty"}`}
            style={{ left: `${slot.x * 100}%`, top: `${slot.y * 100}%` }}
            onDragOver={(e) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = "move"
            }}
            onDrop={handleDrop}
          >
            <div
              className="slot-avatar"
              draggable={!!player}
              onDragStart={(e) => {
                if (!playerId) return
                e.dataTransfer.setData("text/plain", playerId)
                e.dataTransfer.effectAllowed = "move"
              }}
              onDoubleClick={() => player && onClearSlot(slot.id)}
              title={player ? "Doble clic para quitar" : "Arrastrá un jugador aquí"}
            >
              {player ? (
                <img src={player.photo || SILHOUETTE} alt={player.name} crossOrigin="anonymous" />
              ) : (
                <span className="slot-plus" aria-hidden="true">
                  +
                </span>
              )}
            </div>
            {player && <span className="slot-label">{player.name}</span>}
          </div>
        )
      })}
    </div>
  )
})

export default Pitch
