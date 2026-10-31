import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { INPUT_CLASS, INPUT_ERROR_CLASS } from './formStyles'

/** Label + control + inline error. `children` receives the props the control needs. */
export function FormField({ label, required, error, className = '', children }) {
  const id = useId()
  const errorId = `${id}-error`
  const controlProps = { id, 'aria-invalid': Boolean(error) || undefined, 'aria-describedby': error ? errorId : undefined }
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-medium">
        {label}
        {required && <span className="text-bad"> *</span>}
      </label>
      {children(controlProps)}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-[13px] text-bad">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextInput({ error, className = '', ...props }) {
  return <input className={`${INPUT_CLASS} ${error ? INPUT_ERROR_CLASS : ''} ${className}`} {...props} />
}

export function SelectInput({ error, placeholder, options, className = '', ...props }) {
  return (
    <div className="relative">
      <select
        className={`${INPUT_CLASS} appearance-none pr-10 ${error ? INPUT_ERROR_CLASS : ''} ${props.value ? '' : 'text-[#a3a3ab]'} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o} className="text-ink">
            {o.label ?? o}
          </option>
        ))}
      </select>
      <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
    </div>
  )
}
