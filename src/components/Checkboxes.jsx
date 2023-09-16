import React from 'react'

const Checkboxes = ({text, marginBottom, isChecked, checkFlag}) => {
  return (
    <div className={`flex items-center gap-3 ${marginBottom}`}>
        <input className='h-6 w-6' id={text} type="checkbox" checked={isChecked} onChange={checkFlag} />
        <label className='capitalize' htmlFor={text}>{text}</label>
    </div>
  )
}

export default Checkboxes
