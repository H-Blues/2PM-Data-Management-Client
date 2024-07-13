import React, { useState, useEffect, useMemo } from 'react';
import logo2pm from '../../../.erb/img/2pm.jpg';
import logofil from '../../../.erb/img/filecoin.png';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

interface HomeProps {
  onGetStarted: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: '#1488CC',
        },
        image: ' linear-gradient(19deg, #B721FF 0%, #21D4FD 100%)',
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center relative">
        <div className="absolute inset-0">
          <Particles
            id="tsparticles"
            className="w-full h-full"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex justify-center space-x-8 mb-8">
            <img
              src={logo2pm}
              alt="Image 1"
              className="w-40 h-40 rounded-full"
            />
            <img
              src={logofil}
              alt="Image 2"
              className="w-40 h-40 rounded-full"
            />
          </div>
          <h1 className="text-5xl font-fantasy text-center mb-4 ">
            Data Management Desktop
          </h1>
          <p className="text-3xl text-center mb-8 font-mono">2PM x Filecoin</p>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 focus:outline-none"
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
