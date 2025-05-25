import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ProgressIndicator({ current, slideRefs }) {
  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
      {slideRefs.map((ref, idx) => (
        <motion.button
          key={idx}
          onClick={() => ref.current?.scrollIntoView({ behavior: 'smooth' })}
          title={`Slide ${idx + 1}`}
          whileHover={{ scale: 1.2 }}
          className={`w-3 h-3 rounded-full transition-all
            ${current === idx ? 'bg-indigo-600 scale-150' : 'bg-gray-300 hover:bg-indigo-200'}
          `}
        />
      ))}
    </div>
  )
}

ProgressIndicator.propTypes = {
  current: PropTypes.number.isRequired,
  slideRefs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any })
  ).isRequired
}
