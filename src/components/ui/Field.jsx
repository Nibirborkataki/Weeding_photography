import { useId } from 'react'

/**
 * Labelled form control with inline error/hint.
 * as="input" | "textarea" | "select" (pass `options`, or `optionGroups` for <optgroup>s).
 */
export default function Field({
  label,
  hint,
  error,
  optional,
  as: Control = 'input',
  options,
  optionGroups,
  placeholder,
  adornment,
  className = '',
  id,
  ...props
}) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const messageId = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div className={`field ${error ? 'field--invalid' : ''} ${className}`}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
        {optional && <small> (optional)</small>}
      </label>
      <div className="field__control">
        <Control
          id={fieldId}
          className="field__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          placeholder={Control === 'select' ? undefined : placeholder}
          {...props}
        >
          {(options || optionGroups) && (
            <>
              <option value="" disabled>
                {placeholder ?? 'Select…'}
              </option>
              {options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
              {optionGroups?.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </>
          )}
        </Control>
        {adornment}
      </div>
      {error ? (
        <p id={messageId} className="field__error">
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
