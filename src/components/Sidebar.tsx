import { useRef, useState } from "react"
import type { Player } from "../types"
import { SILHOUETTE } from "../players"

interface SidebarProps {
  players: Player[]
  placedIds: Set<string>
  onAddPlayer: (name: string) => void
  onUpdatePhoto: (id: string, photo: string) => void
  onRemovePlayer: (id: string) => void
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Sidebar({
  players,
  placedIds,
  onAddPlayer,
  onUpdatePhoto,
  onRemovePlayer,
}: SidebarProps) {
  const [name, setName] = useState("")
  const uploadTarget = useRef<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    if (!name.trim()) return
    onAddPlayer(name.trim().toUpperCase())
    setName("")
  }

  const pickPhoto = (id: string) => {
    uploadTarget.current = id
    fileInput.current?.click()
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const id = uploadTarget.current
    if (file && id) {
      const dataUrl = await fileToDataUrl(file)
      onUpdatePhoto(id, dataUrl)
    }
    e.target.value = ""
    uploadTarget.current = null
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <h1>Jugadores</h1>
        <p className="hint">Arrastrá un jugador a una posición</p>
      </div>

      <div className="add-form">
        <input
          className="input"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) handleAdd()
          }}
          aria-label="Nombre del jugador"
        />
        <button className="btn add-btn" onClick={handleAdd}>
          Agregar jugador
        </button>
      </div>

      <ul className="player-list">
        {players.map((player) => {
          const placed = placedIds.has(player.id)
          return (
            <li
              key={player.id}
              className={`player-item ${placed ? "is-placed" : ""}`}
              draggable={!placed}
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", player.id)
                e.dataTransfer.effectAllowed = "move"
              }}
            >
              <button
                type="button"
                className="avatar-btn"
                onClick={() => pickPhoto(player.id)}
                title="Cambiar foto"
              >
                <img
                  className="avatar-img"
                  src={player.photo || SILHOUETTE}
                  alt={player.name}
                />
              </button>
              <div className="player-meta">
                <span className="player-name">{player.name}</span>
                <span className="player-sub">
                  {placed ? "En la cancha" : "Sin ubicar"}
                </span>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => onRemovePlayer(player.id)}
                title="Eliminar"
                aria-label={`Eliminar ${player.name}`}
              >
                ×
              </button>
            </li>
          )
        })}
      </ul>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </aside>
  )
}
