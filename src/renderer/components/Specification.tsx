import React from 'react';

const Specification: React.FC = () => {
  return (
    <div className="max-w-full pr-32 mt-14 bg-white rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        📜 Specification
      </h1>
      <p className="mb-4">
        🌐 2PM.Network is a full-chain modular AI privacy computing incentive
        protocol that uses the Story Protocol to copyright AI models and
        distribute the inference revenue of AI models to privacy data and
        computing power contributors. It's like a superhero team for AI! 🦸‍♀️🦸‍♂️
      </p>
      <p className="mb-4">
        🤝 2PM.Network collaborates with the 0G AI data layer, utilizing
        client-side and data management contract suites to enable users to
        conveniently verify, encrypt, and upload their own data. It's a match
        made in data heaven! 😇
      </p>
      <p className="mb-4">
        🔒 This client implements basic data encryption and data upload
        functionality. In addition to providing users with the most secure local
        encryption method (because we take security seriously! 🕵️‍♂️), it also
        establishes a trusted data server, allowing users to complete data
        encryption and upload to 0G with a single click. It's like magic, but
        better! 🪄✨
      </p>
    </div>
  );
};

export default Specification;
