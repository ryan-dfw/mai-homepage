import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import Editable from './Editable'

type Props = {
  to: string
  id: string
  defaultValue: string
  className?: string
}

/**
 * A React Router Link whose entire label is editable text. While the label
 * is being edited, the link is disabled (clicks anywhere on it are ignored)
 * so they don't "fall through" and navigate away mid-edit.
 */
export default function EditableCtaLink({ to, id, defaultValue, className }: Props) {
  const [editing, setEditing] = useState(false)

  const onClick = (e: MouseEvent) => {
    if (editing) e.preventDefault()
  }

  return (
    <Link
      to={to}
      className={`${className ?? ''}${editing ? ' cta-editing' : ''}`}
      aria-disabled={editing}
      onClick={onClick}
    >
      <Editable as="span" id={id} defaultValue={defaultValue} onEditingChange={setEditing} />
    </Link>
  )
}
