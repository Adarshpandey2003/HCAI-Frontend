import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-white rounded-xl p-6 shadow-md ${className}`}
    >
      {children}
    </motion.div>
  )
}
