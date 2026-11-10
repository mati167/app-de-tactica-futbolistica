import { useMemo, useRef, useState } from "react"
import { toPng } from "html-to-image"
import type { Player, Assignments } from "./types"
import { DEFAULT_PLAYERS } from "./players"
import { SLOTS } from "./formation"
import Sidebar from "./components/Sidebar"
import Pitch from "./components/Pitch"

export default function App() {
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS)
  const [assignments, setAssignments] = useState<Assignments>({})
  const [downloading, setDownloading] = useState(false)
  const pitchRef = useRef<HTMLDivElement>(null)

  const playerMap = useMemo(
    () => new Map(players.map((p) => [p.id, p])),
    [players],
  )
  const placedIds = useMemo(
    () => new Set(Object.values(assignments)),
    [assignments],
  )

  const filledCount = placedIds.size
  const allPlaced = filledCount === SLOTS.length

  const handleAssign = (slotId: string, playerId: string) => {
    setAssignments((prev) => {
      const next: Assignments = { ...prev }
      // A player can only occupy one slot: clear any slot already holding them.
      for (const [id, pid] of Object.entries(next)) {
        if (pid === playerId) delete next[id]
      }
      next[slotId] = playerId
      return next
    })
  }

  const handleClearSlot = (slotId: string) => {
    setAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })
  }

  const handleAddPlayer = (name: string) => {
    setPlayers((prev) => [
      ...prev,
      { id: `p-${Date.now()}`, name, photo: "" },
    ])
  }

  const handleUpdatePhoto = (id: string, photo: string) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, photo } : p)))
  }

  const handleRemovePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id))
    setAssignments((prev) => {
      const next: Assignments = {}
      for (const [slotId, pid] of Object.entries(prev)) {
        if (pid !== id) next[slotId] = pid
      }
      return next
    })
  }

  const handleDownload = async () => {
    if (!pitchRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(pitchRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      })
      const link = document.createElement("a")
      link.download = "alineacion.png"
      link.href = dataUrl
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="app">
      <Sidebar
        players={players}
        placedIds={placedIds}
        onAddPlayer={handleAddPlayer}
        onUpdatePhoto={handleUpdatePhoto}
        onRemovePlayer={handleRemovePlayer}
      />

      <main className="main">
        <header className="toolbar">
          <div className="toolbar-info">
            <strong>Alineación</strong>
            <span className="counter">
              {filledCount}/{SLOTS.length} ubicados
            </span>
          </div>
          <button
            className="btn download-btn"
            onClick={handleDownload}
            disabled={!allPlaced || downloading}
            title={
              allPlaced
                ? "Descargar imagen"
                : "Ubicá a todos los jugadores para habilitar la descarga"
            }
          >
            {downloading ? "Generando…" : "Descargar imagen"}
          </button>
        </header>

        <div className="pitch-wrap">
          <Pitch
            ref={pitchRef}
            assignments={assignments}
            players={playerMap}
            onAssign={handleAssign}
            onClearSlot={handleClearSlot}
          />
        </div>
      </main>
    </div>
  )
}
