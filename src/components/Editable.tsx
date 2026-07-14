import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent, MouseEvent, ReactElement } from 'react'
import { useEditableText } from '../editable/EditableContext'
import { useControlsVisible } from '../editable/ControlsVisibilityContext'

type BaseProps = {
  /** Element the visible text renders as. Defaults to 'span'. */
  as?: string
  className?: string
  /** Use a textarea instead of a single-line input when editing */
  multiline?: boolean
  /**
   * Called whenever this field enters/leaves edit mode. Use it to disable an
   * ancestor Link/button so clicks don't "fall through" while typing.
   */
  onEditingChange?: (editing: boolean) => void
}

type StoreModeProps = BaseProps & {
  /** Stable, unique key for this piece of copy, e.g. "home.hero.headline" */
  id: string
  /** Original copy — used until (and unless) the user saves an edit */
  defaultValue: string
  value?: undefined
  onSave?: undefined
}

type ControlledModeProps = BaseProps & {
  id?: undefined
  defaultValue?: undefined
  /** Current value, when this piece of text is owned by something other than the text-copy store (e.g. a gallery category label) */
  value: string
  /** Called with the new value on save, instead of writing to the text-copy store */
  onSave: (value: string) => void
}

type Props = StoreModeProps | ControlledModeProps

export default function Editable(props: Props) {
  const { as = 'span', className, multiline = false, onEditingChange } = props
  const { getValue, setValue } = useEditableText()
  const { visible: controlsVisible } = useControlsVisible()

  const isControlled = props.value !== undefined
  const value = isControlled ? props.value : getValue(props.id, props.defaultValue)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
    onEditingChange?.(editing)
    // onEditingChange is expected to be a stable (or effectively stable) callback;
    // we only want this to run when the editing flag itself flips.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing])

  // If preview mode is toggled on mid-edit, bail out of editing rather than
  // leave an orphaned input with no way to reach its save/cancel controls.
  useEffect(() => {
    if (!controlsVisible && editing) setEditing(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlsVisible])

  // Stops the click from reaching an ancestor Link/button AND stops the
  // browser's native default action (e.g. anchor navigation) for that click.
  const swallowClick = (e: MouseEvent) => { e.stopPropagation(); e.preventDefault() }
  // Mousedown only needs to stop propagation — must NOT preventDefault here,
  // or text inputs lose normal focus/cursor-placement behavior.
  const stopMouseDown = (e: MouseEvent) => e.stopPropagation()

  const beginEdit = () => {
    setDraft(value)
    setEditing(true)
  }

  const startEdit = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    beginEdit()
  }

  const save = () => {
    if (isControlled) props.onSave(draft)
    else setValue(props.id, draft)
    setEditing(false)
  }

  const cancel = () => setEditing(false)

  const onKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === 'Escape') { e.preventDefault(); cancel() }
    else if (e.key === 'Enter' && (!multiline || e.metaKey || e.ctrlKey)) { e.preventDefault(); save() }
  }

  const activate = (fn: () => void) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); fn() }
  }

  const Tag = as as unknown as (props: Record<string, unknown>) => ReactElement

  if (editing) {
    return (
      <Tag className={`editable-wrap editable-editing ${className ?? ''}`} onClick={swallowClick} onMouseDown={stopMouseDown}>
        {multiline ? (
          <textarea
            ref={inputRef}
            className="editable-input editable-textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onClick={swallowClick}
            onMouseDown={stopMouseDown}
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            className="editable-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onClick={swallowClick}
            onMouseDown={stopMouseDown}
          />
        )}
        <span className="editable-controls">
          <span
            role="button"
            tabIndex={0}
            className="editable-btn editable-save"
            aria-label="Save"
            onClick={e => { swallowClick(e); save() }}
            onMouseDown={stopMouseDown}
            onKeyDown={activate(save)}
          >
            ✓
          </span>
          <span
            role="button"
            tabIndex={0}
            className="editable-btn editable-cancel"
            aria-label="Cancel"
            onClick={e => { swallowClick(e); cancel() }}
            onMouseDown={stopMouseDown}
            onKeyDown={activate(cancel)}
          >
            ✕
          </span>
        </span>
      </Tag>
    )
  }

  return (
    <Tag className={`editable-wrap ${className ?? ''}`}>
      {value}
      {controlsVisible && (
        <span
          role="button"
          tabIndex={0}
          className="editable-pencil"
          aria-label="Edit text"
          onClick={startEdit}
          onMouseDown={stopMouseDown}
          onKeyDown={activate(beginEdit)}
        >
          ✎
        </span>
      )}
    </Tag>
  )
}
