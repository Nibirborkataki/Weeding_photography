import { useCallback, useState } from 'react'
import { hasErrors } from '../utils/validation'

const focusFirstInvalid = (form) =>
  requestAnimationFrame(() => form?.querySelector('[aria-invalid="true"]')?.focus())

/**
 * Small form helper: value binding, validation, submit status and
 * service-error mapping (ServiceError.fieldErrors → inline messages).
 */
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const setValue = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => {
      if (!e[name]) return e
      const { [name]: _removed, ...rest } = e
      return rest
    })
  }, [])

  const bind = (name) => {
    const isBool = typeof initialValues[name] === 'boolean'
    return {
      name,
      error: errors[name],
      ...(isBool ? { checked: !!values[name] } : { value: values[name] ?? '' }),
      onChange: (e) => setValue(name, isBool ? e.target.checked : e.target.value),
    }
  }

  const handleSubmit = (onSubmit, onError) => async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const found = validate ? validate(values) : {}
    setErrors(found)
    if (hasErrors(found)) {
      focusFirstInvalid(form)
      return
    }
    setStatus('submitting')
    try {
      await onSubmit(values)
      setStatus('success')
    } catch (err) {
      setErrors(err.fieldErrors ?? {})
      setStatus('idle')
      focusFirstInvalid(form)
      onError?.(err)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }

  return { values, errors, status, bind, setValue, handleSubmit, reset }
}
