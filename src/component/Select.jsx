import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-2 pl-1 text-gray-300 font-medium'>{label}</label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-slate-700 text-white outline-none focus:bg-slate-600 focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-600 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option} className="bg-slate-700 text-white">
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)