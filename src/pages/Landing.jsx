// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import Button            from '../components/UI/Button';
import Card              from '../components/UI/Card';
import BlobOverlay       from '../components/UI/BlobOverlay';
import ProgressIndicator from '../components/UI/ProgressIndicator';
import useInView         from '../hooks/useInView';
import Lottie            from 'lottie-react';
import {
  ChevronDownIcon,
  ClipboardListIcon,
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Import the bundled Lottie JSON files:
import checkAnimation  from '../assets/lottie/check.json';
import shieldAnimation from '../assets/lottie/shield.json';
import privacyAnimation from '../assets/lottie/privacy.json';
import {heroHealthVid,
  quesAns,
  predictionIcon,
  remediesIcon,} from '../assets/graphics';
export default function Landing() {
  // refs + inView flags for each slide
  const [heroRef,    heroVisible]    = useInView({ threshold: 0.5 });
  const [howRef,     howVisible]     = useInView({ threshold: 0.5 });
  const [perfRef,    perfVisible]    = useInView({ threshold: 0.5 });
  const [trustRef,   trustVisible]   = useInView({ threshold: 0.5 });
  const [privacyRef, privacyVisible] = useInView({ threshold: 0.5 });

  // which slide index is active?
  const [currentSlide, setCurrentSlide] = useState(0);

  // determine active slide by checking from the last to the first
  useEffect(() => {
    if (privacyVisible)        setCurrentSlide(4);
    else if (trustVisible)     setCurrentSlide(3);
    else if (perfVisible)      setCurrentSlide(2);
    else if (howVisible)       setCurrentSlide(1);
    else if (heroVisible)      setCurrentSlide(0);
  }, [heroVisible, howVisible, perfVisible, trustVisible, privacyVisible]);

  // helper to scroll into view
  const scrollTo = ref => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const slideRefs = [heroRef, howRef, perfRef, trustRef, privacyRef];

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-gray-50">
      {/* side dot navigation */}
      <ProgressIndicator current={currentSlide} slideRefs={slideRefs} />

      {/* ====== Slide 0: Hero ====== */}
      <section
        ref={heroRef}
        className="snap-start relative h-screen overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroHealthVid}
          autoPlay
          muted
          loop
          playsInline
        />
        <BlobOverlay style={{ top: '10%', left: '5%', width: '40%' }} />
        <BlobOverlay style={{ bottom: '10%', right: '5%', width: '50%' }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            Predict Your Health Condition Instantly
          </h1>
          <p className="mt-4 text-lg text-gray-100 max-w-2xl">
            Our AI model analyzes your symptoms to suggest possible conditions and safe home remedies.
          </p>
          <div className="mt-8 flex space-x-4">
            <Button to="/login" variant="solid">Get Started</Button>
            <Button to="/vision" variant="outline">Learn More</Button>
          </div>
        </div>
        <button
          onClick={() => scrollTo(howRef)}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/60 rounded-full p-2 hover:bg-white/80 transition"
          aria-label="Scroll to How It Works"
        >
          <ChevronDownIcon className="h-6 w-6 text-gray-800 animate-bounce" />
        </button>
      </section>

      {/* ====== Slide 1: How It Works ====== */}
      <section
        ref={howRef}
        className="snap-start relative h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-60" />
        <div className="relative z-10 text-center space-y-8 transform transition-all duration-500 ease-out">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: quesAns,
                title: '1. Answer Questions',
                desc:  'Select the symptoms you’re experiencing.'
              },
              {
                icon: predictionIcon,
                title: '2. Get Prediction',
                desc:  'Our model classifies possible conditions.'
              },
              {
                icon: remediesIcon,
                title: '3. View Remedies',
                desc:  'Receive safe, doctor-approved home remedies.'
              }
            ].map((step, i) => (
              <Card key={i} className="group hover:scale-105 transition">
                <img src={step.icon} alt="" className="h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-gray-700">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ====== Slide 2: Reliable Performance ====== */}
      <section
        ref={perfRef}
        className="snap-start relative h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-indigo-50 opacity-60" />
        <div className="relative z-10 text-center space-y-6 transform transition-all duration-500 ease-out px-4">
          <Lottie
            animationData={checkAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 100, margin: '0 auto' }}
          />
          <h2 className="text-6xl font-bold text-indigo-700">
            Reliable Performance
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-2xl">
            <li>Tested on over 5,000 patient records</li>
            <li>133 clinical parameters evaluated per case</li>
            <li>97.5% disease‐classification accuracy</li>
          </ul>
        </div>
      </section>

      {/* ====== Slide 3: Trustworthiness ====== */}
      <section
        ref={trustRef}
        className="snap-start relative h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-50 opacity-60" />
        <div className="relative z-10 text-center space-y-6 transform transition-all duration-500 ease-out px-4">
          <Lottie
            animationData={shieldAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 100, margin: '0 auto' }}
          />
          <h2 className="text-6xl font-bold text-yellow-700">Trustworthiness</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-2xl">
            <li>We never use your symptom data to train our models</li>
            <li>Only hashed login credentials are stored securely</li>
            <li>End-to-end encryption protects all data in transit</li>
            <li>Regular security audits ensure your privacy</li>
          </ul>
        </div>
      </section>

      {/* ====== Slide 4: Privacy You Can Trust ====== */}
      <section
        ref={privacyRef}
        className="snap-start relative h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-50 opacity-60" />
        <div className="relative z-10 text-center space-y-6 transform transition-all duration-500 ease-out px-4">
          <Lottie
            animationData={privacyAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 100, margin: '0 auto' }}
          />
          <h2 className="text-6xl font-bold text-emerald-700">Privacy You Can Trust</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-2xl">
            <li>Symptom data never used to train our models</li>
            <li>Only hashed login credentials are stored</li>
            <li>No personally identifiable data is ever exposed</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
