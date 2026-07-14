import { useState } from 'react'
import type { MouseEvent } from 'react'
import Editable from './Editable'

type Props = {
  id: string
  defaultValue: string
  className?: string
}

/**
 * A submit button whose label is editable text. While the label is being
 * edited, the button is disabled so a click doesn't submit the form.
 */
export default function EditableSubmitButton({ id, defaultValue, className }: Props) {
  const [editing, setEditing] = useState(false)

  const onClick = (e: MouseEvent) => {
    if (editing) e.preventDefault()
  }

  return (
    <button
      type="submit"
      className={`${className ?? ''}${editing ? ' cta-editing' : ''}`}
      aria-disabled={editing}
      onClick={onClick}
    >
      <Editable as="span" id={id} defaultValue={defaultValue} onEditingChange={setEditing} />
    </button>
  )
}
