import React from 'react';
import { useNavigate } from 'react-router-dom';
import local from '../../../.erb/img/local.png';
import server from '../../../.erb/img/server.png';

const Choose: React.FC = () => {
  const navigate = useNavigate();

  const handleLocalClick = (): void => {
    navigate('/local-encryption');
  };

  const handleServerClick = (): void => {
    navigate('/one-click-operation');
  };

  return (
    <div className="max-w-full pr-32 mt-14 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        ✅ Choose Encryption Method
      </h1>
      <div className="flex justify-center space-x-8 rounded-md items-center">
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          onClick={handleLocalClick}
        >
          <img src={local} alt="Local Encryption" className="w-40 h-40 mb-4" />
          <h2 className="text-xl font-bold mb-2">Local</h2>
          <p className="text-center text-gray-600">(Manual Operation)</p>
        </div>
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
          onClick={handleServerClick}
        >
          <img
            src={server}
            alt="Server Encryption"
            className="w-40 h-40 mb-4"
          />
          <h2 className="text-xl font-bold mb-2">Server</h2>
          <p className="text-center text-gray-600">(One Click Operation)</p>
        </div>
      </div>
    </div>
  );
};

export default Choose;
