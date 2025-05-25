// src/components/UI/ScrollSlide.jsx
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import useInView from '../../hooks/useInView';

export default function ScrollSlide({ Icon, accentColor, title, bullets }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`
        max-w-3xl mx-auto my-16 p-8 bg-gradient-to-r from-white/60 to-white/20
        backdrop-blur-sm rounded-xl shadow-xl flex flex-col items-start space-y-4
        border-l-4 transition-all duration-700 ease-out
        ${inView 
          ? 'opacity-100 translate-y-0 border-l-[6px]'
          : 'opacity-0 translate-y-12 border-l-0'
        }
      `}
      style={{ borderColor: accentColor }}
    >
      {/* Icon */}
      {Icon && (
        <Icon className="h-10 w-10" style={{ color: accentColor }} />
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold" style={{ color: accentColor }}>
        {title}
      </h3>

      {/* Bullet list */}
      <ul className="space-y-2 pl-6">
        {bullets.map((text, i) => (
          <li key={i} className="flex items-start">
            <CheckIcon className="h-5 w-5 flex-shrink-0 mt-1 mr-2" style={{ color: accentColor }}/>
            <span className="text-gray-700">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
