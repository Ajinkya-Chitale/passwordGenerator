import React from 'react'

const Button = ({marginTop, generateFun}) => {
  return (
    <button className={`border px-6 py-1 text-white ${marginTop}`} style={{backgroundColor: '#36cd2c'}} onClick={generateFun}>Generate</button>
  )
}

export default Button
