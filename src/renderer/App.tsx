// App.js
import {
  MemoryRouter as Router,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import logo2pm from '../../.erb/img/2pm.jpg';
import logoZama from '../../.erb/img/zama.jpg';
import logofil from '../../.erb/img/filecoin.png';
// import logo0g from '../../.erb/img/0g.jpg';

import Home from './components/Home';
import KeyManagement from './components/KeyManagement';
import Specification from './components/Specification';
import Choose from './components/Choose';
import LocalEncryption from './components/LocalEncryption';
import UploadEncryptedData from './components/DataUpload';
import OneClickOperation from './components/OneClickOperation';

import './App.css';

interface SidebarItem {
  path: string;
  label: string;
  emoji?: string;
  logo?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Account',
    items: [{ path: '/key-management', emoji: '🔑', label: 'Key Management' }],
  },
  {
    title: 'Data',
    items: [
      { path: '/specification', emoji: '📃', label: 'Specification' },
      {
        path: '/choose-encryption',
        emoji: '✅',
        label: 'Choose your Encryption',
      },
      {
        path: '/local-encryption',
        emoji: '🔐',
        label: 'Step1: Local FHE Encryption',
      },
      {
        path: '/upload-encrypted-data',
        emoji: '⏫',
        label: 'Step2: Upload Encrypted Data',
      },
      {
        path: '/one-click-operation',
        emoji: '🛜',
        label: 'One Click Operation',
      },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { path: '/2pm-network', logo: logo2pm, label: '2PM.Network' },
      { path: '/zama', logo: logoZama, label: 'ZAMA' },
      { path: '/filecoin', logo: logofil, label: 'Filecoin' },
    ],
  },
];

function Sidebar() {
  return (
    <nav className="w-72 bg-gray-100 p-4 flex flex-col border-r border-gray-300 h-screen">
      {sidebarSections.map((section, index) => (
        <div key={index}>
          <div className="font-sans font-bold text-xl mb-4 text-gray-600">
            {section.title}
          </div>
          <ul className="space-y-2 pl-4">
            {section.items.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `font-sans text-sm text-gray-700 hover:text-gray-900 flex items-center ${
                      isActive ? 'font-bold' : ''
                    }`
                  }
                >
                  {item.emoji && (
                    <span className="text-xl mr-2">{item.emoji}</span>
                  )}
                  {item.logo && (
                    <img src={item.logo} alt="logo" className="w-6 h-6 mr-2" />
                  )}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {index < sidebarSections.length - 1 && (
            <div className="mt-8 mb-4 border-t border-gray-300"></div>
          )}
        </div>
      ))}
      <div className="fixed bottom-4 left-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
          FAQ
        </button>
      </div>
    </nav>
  );
}

function MainContent() {
  return (
    <main>
      <Routes>
        <Route path="/key-management" element={<KeyManagement />} />
        <Route path="/specification" element={<Specification />} />
        <Route path="/choose-encryption" element={<Choose />} />
        <Route path="/local-encryption" element={<LocalEncryption />} />
        <Route
          path="/upload-encrypted-data"
          element={<UploadEncryptedData />}
        />
        <Route path="/one-click-operation" element={<OneClickOperation />} />
      </Routes>
    </main>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/key-management');
  };

  return (
    <Routes>
      <Route path="/" element={<Home onGetStarted={handleGetStarted} />} />
      <Route
        path="*"
        element={
          <div className="relative grid grid-cols-12 h-screen">
            <div className="col-span-4">
              <Sidebar />
            </div>
            <div className="col-span-8">
              <MainContent />
            </div>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
