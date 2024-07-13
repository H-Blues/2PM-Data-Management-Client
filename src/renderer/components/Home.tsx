import React from 'react';
import logo2pm from '../../../.erb/img/2pm.jpg';
import logofil from '../../../.erb/img/filecoin.png';

interface HomeProps {
  onGetStarted: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 to-blue-300 animate-pulse">
      <div className="flex justify-center space-x-8 mb-8">
        <img src={logo2pm} alt="Image 1" className="w-40 h-40 rounded-full" />
        <img src={logofil} alt="Image 2" className="w-40 h-40 rounded-full" />
      </div>
      <h1 className="text-5xl font-fantasy text-center mb-4">
        Data Management Desktop
      </h1>
      <p className="text-3xl font-sans text-center mb-8">2PM x Filecoin</p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 focus:outline-none"
        onClick={onGetStarted}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
