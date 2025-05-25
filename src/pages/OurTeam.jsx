// src/pages/OurTeam.jsx
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const team = [
  {
    name: 'Adarsh Pandey, Fullstack Dev',
    tags: ['Node.js', 'React'],
    img: '/assets/adarsh-pic.jpg',
    description: [
      'Adarsh is a seasoned full‐stack developer with 6 years of experience building scalable web applications.',
      'He excels at designing RESTful APIs in Node.js and crafting dynamic UIs with React.',
      'His passion for clean code drives him to follow best practices and mentor junior engineers.',
      'Outside of coding, Adarsh loves mountain biking and contributing to open‐source projects.',
    ],
  },
  {
    name: 'Arpith Kagalkar, Frontend Eng',
    tags: ['TypeScript', 'Tailwind'],
    img: '/assets/arpith-pic.jpg',
    description: [
      'Arpith specializes in pixel‐perfect, accessible interfaces using modern frontend stacks.',
      'He’s written dozens of custom React hooks and TypeScript utility libraries.',
      'A stickler for design system consistency, he ensures every component is robust and reusable.',
      'When not coding, you’ll find him experimenting with UI animations or playing chess.',
    ],
  },
  {
    name: 'Mohit Singh, UX Designer',
    tags: ['Figma', 'Accessibility'],
    img: '/assets/mohit-pic.jpg',
    description: [
      'Mohit is our resident UX champion, crafting intuitive flows in Figma and Sketch.',
      'He conducts user interviews and accessibility audits to make products inclusive.',
      'His wireframes and prototypes have led to 30% faster onboarding times.',
      'He’s also a coffee‐art enthusiast and volunteers teaching design in local meetups.',
    ],
  },
  {
    name: 'Anant Sharma, Backend Eng',
    tags: ['Python', 'Django'],
    img: '/assets/anant-pic.jpg',
    description: [
      'Anant architects and maintains our core data pipelines in Python and Django.',
      'He optimized our API to handle 10× more traffic without scaling hardware.',
      'A test‐driven developer, he writes extensive unit and integration tests.',
      'He enjoys tackling complex database migrations and fine‐tuning performance.',
    ],
  },
];

export default function OurTeam() {
  const [idx, setIdx] = useState(0);
  const total = team.length;

  const prev = () => setIdx((idx - 1 + total) % total);
  const next = () => setIdx((idx + 1) % total);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-300 py-16 font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ==== HEADER & NAVIGATION ==== */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="space-y-4 text-center md:text-left md:w-1/2">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              MEET<br />
              <span className="text-violet-400 italic">OUR</span><br />
              TEAM
            </h1>
            <p className="mt-2 text-gray-600 max-w-md text-base md:text-lg">
              When you need fast and effective medical insights, trust the people behind the code.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-6">
              <button
                onClick={prev}
                className="p-2 bg-white rounded-full shadow hover:bg-violet-100 transition"
              >
                <ChevronLeftIcon className="w-6 h-6 text-violet-600" />
              </button>
              <span className="text-lg font-medium text-gray-700">
                {idx + 1} / {total}
              </span>
              <button
                onClick={next}
                className="p-2 bg-white rounded-full shadow hover:bg-violet-100 transition"
              >
                <ChevronRightIcon className="w-6 h-6 text-violet-600" />
              </button>
            </div>
          </div>

          {/* ==== CAROUSEL STACK ==== */}
          <div className="relative md:w-1/2 h-[200px] sm:h-[240px] lg:h-[280px]">
            {team.map((member, i) => {
              let offset = i - idx;
              if (offset < -total / 2) offset += total;
              if (offset > total / 2) offset -= total;
              if (Math.abs(offset) > 2) return null;

              const zIndex     = 10 - Math.abs(offset);
              const translateX = offset * 140;
              const scale      = 1 - Math.abs(offset) * 0.1;
              const opacity    = 1 - Math.abs(offset) * 0.5;

              return (
                <img
                  key={member.name}
                  src={member.img}
                  alt={member.name}
                  className="absolute top-1/2 left-1/2 w-56 h-80 rounded-xl object-cover shadow-xl transition-transform"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ==== DETAILS & BIO ==== */}
        <div className="mt-8 max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-2xl font-semibold text-gray-900">
            {team[idx].name}
          </h2>
          <div className="flex justify-center space-x-2">
            {team[idx].tags.map(tag => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm md:text-base text-violet-700 bg-violet-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-gray-700 leading-relaxed text-base md:text-xl text-left">
            {team[idx].description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
