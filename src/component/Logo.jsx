import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="text-white font-bold text-xl tracking-wide">
      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        ARC
      </span>
    </div>
  )
}

export default Logo