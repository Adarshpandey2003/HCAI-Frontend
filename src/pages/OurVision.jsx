// src/pages/OurVision.jsx
import React, { useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { visionVid } from '../assets/graphics';
export default function OurVision() {
  const missionRef = useRef(null);

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-poppins">

      {/* ====== Full-screen Vision Video ====== */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video bg */}
        <video
          src={visionVid}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered copy + button */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-4">
            Our Vision
          </h2>
          <p className="text-white text-lg md:text-xl max-w-2xl mb-8">
            We envision a world where anyone can access safe, AI-driven health guidance at their fingertips, empowering them to make informed decisions about their well-being.
            Our platform aims to bridge the gap between symptoms and medical advice, ensuring that no one has to navigate health challenges alone.
          </p>
          <button
            onClick={scrollToMission}
            aria-label="Scroll to Our Mission"
            className="p-3 bg-violet-300 rounded-full hover:bg-violet-700 transition"
          >
            <ChevronDownIcon className="w-6 h-6 text-white-800 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ====== Our Mission ====== */}
      <section
        ref={missionRef}
        className="bg-white py-20 px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">Our Mission</h3>
          <p className="text-gray-700 text-lg leading-relaxed space-y-4">
            Our mission is to build a platform that empowers anyone experiencing symptoms—but reluctant or unable to see a doctor—to get safe, AI-driven guidance.
            Too often people rely on hearsay or pharmacists’ advice without full context, leading to harmful misdiagnoses and wrong medications.
            We’re committed to reducing those tragic outcomes—hundreds of lives are lost each year—by delivering reliable, clinically-validated recommendations directly in your pocket.
          </p>

          {/* three-pill graphic */}
          <div className="mt-12 flex flex-col md:flex-row justify-center items-stretch gap-8">
            <div className="flex-1 border-2 border-violet-300 rounded-full py-6 px-4">
              <p className="text-violet-700 font-medium">
                Preventing dangerous self-medication
              </p>
            </div>
            <div className="flex-1 border-2 border-violet-300 rounded-full py-6 px-4">
              <p className="text-violet-700 font-medium">
                Bridging symptom-to-doctor information gaps
              </p>
            </div>
            <div className="flex-1 bg-violet-400 rounded-full py-6 px-4">
              <p className="text-white font-medium">
                Saving lives through early, accurate guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Our Values ====== */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6">Our Values</h3>
          <ul className="text-gray-700 text-lg leading-relaxed list-disc list-inside space-y-4">
            <li><strong>Empathy:</strong> We put users first, always.</li>
            <li><strong>Accuracy:</strong> Every suggestion is backed by peer-reviewed medical research.</li>
            <li><strong>Privacy:</strong> Your health data is encrypted—yours alone.</li>
            <li><strong>Transparency:</strong> We clearly explain why and how we arrive at each recommendation.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
