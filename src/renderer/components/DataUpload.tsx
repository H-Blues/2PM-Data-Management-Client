import React, {
  useState,
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
} from 'react';
import * as Client from '@web3-storage/w3up-client';
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory';
import * as Proof from '@web3-storage/w3up-client/proof';
import { Signer } from '@web3-storage/w3up-client/principal/ed25519';
import Modal from './Modal';

interface ElectronAPI {
  ipcRenderer: {
    invoke(channel: string, ...args: any[]): Promise<any>;
  };
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

let globalClient: any = null;

const UploadEncryptedData: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const setupClient = async () => {
      try {
        const key = process.env.KEY;
        const proofString = process.env.PROOF;

        if (!key || !proofString) {
          throw new Error('Environment variables KEY and PROOF must be set');
        }

        const principal = Signer.parse(key);
        const store = new StoreMemory();
        const client = await Client.create({ principal, store });

        const proof = await Proof.parse(proofString);
        const space = await client.addSpace(proof);
        await client.setCurrentSpace(space.did());

        globalClient = client;
      } catch (error) {
        console.error('Error setting up client:', error);
      }
    };

    setupClient();
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setIsSuccess(false);
      setMessage('Please select a file to upload.');
      setIsModalOpen(true);
      return;
    }

    if (!globalClient) {
      setIsSuccess(false);
      setMessage('IPFS client is not initialized yet.');
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    setIsModalOpen(true);
    setMessage('Uploading file...');

    try {
      const directoryCid = await globalClient.uploadFile(file);
      console.log('Uploaded file with CID:', directoryCid);
      const fileUrl = `https://${directoryCid.toString()}.ipfs.w3s.link`;

      setIsSuccess(true);
      setMessage('File uploaded successfully. Redirecting to file...');
      setUploadedFileUrl(fileUrl);

      setTimeout(() => {
        window.open(fileUrl, '_blank');
        setIsModalOpen(false);
      }, 2000);

      setFile(null);
    } catch (error) {
      setIsSuccess(false);
      setMessage('Failed to upload file. Please try again.');
      setIsModalOpen(true);
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full pr-32 mt-14 bg-white rounded-md">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSuccess={isSuccess}
        message={message}
        isLoading={isLoading}
      />

      <h1 className="text-3xl font-bold mb-6 text-left font-sans">
        ⏫ Upload Encrypted Data
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className={`border-2 border-dashed border-gray-400 p-8 mb-4 ${
            isDragOver ? 'bg-gray-200' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag and drop a file here or click to select a file</p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:underline flex justify-center"
          >
            Browse files
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
      </form>

      {isSuccess && uploadedFileUrl && !isLoading && (
        <p className="mt-2 text-sm text-gray-500">
          If you are not redirected automatically,
          <a
            href={uploadedFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            click here
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default UploadEncryptedData;
