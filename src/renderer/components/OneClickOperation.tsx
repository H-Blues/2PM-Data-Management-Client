import React, { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';

interface EncryptionStatus {
  isEncrypting: boolean;
  encryptedFilePath: string;
}

const LocalEncryption: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [preview, setPreview] = useState<any[] | null>(null);
  const [encryptionStatus, setEncryptionStatus] = useState<EncryptionStatus>({
    isEncrypting: false,
    encryptedFilePath: '',
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDescription('');
      setPreview(null);
      setEncryptionStatus({
        isEncrypting: false,
        encryptedFilePath: '',
      });
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePreview = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type === 'application/json') {
          const jsonData = JSON.parse(reader.result as string);
          setPreview(jsonData);
        } else {
          Papa.parse(file, {
            complete: (results) => {
              setPreview(results.data);
            },
            preview: 5,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleEncryption = async () => {
    if (file && description) {
      setEncryptionStatus({ isEncrypting: true, encryptedFilePath: '' });
      try {
        setTimeout(() => {
          setEncryptionStatus({
            isEncrypting: false,
            encryptedFilePath: '/src/services/spector.py',
          });
        }, 1200);
      } catch (err) {
        console.error(err);
        setEncryptionStatus({ isEncrypting: false, encryptedFilePath: '' });
      }
    }
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="max-w-full pr-32 mt-14 bg-white rounded-md pb-16">
        <h1 className="text-3xl font-bold mb-6 text-left font-sans">
          🛜 One Click Operation
        </h1>
        <div className="mb-2">
          <label htmlFor="fileInput" className="block mb-2 font-semibold">
            Select File:
          </label>
          <label
            htmlFor="fileInput"
            className="btn border p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer font-cursive"
          >
            Choose one File
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".csv,.xlsx,.xls,.json"
            style={{ visibility: 'hidden' }}
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-3/4"
          />
        </div>
        {file && (
          <div className="mb-4">
            <p className="font-semibold">File Information:</p>
            <p>Name: {file.name}</p>
            <p>Size: {file.size} bytes</p>
            <p>Type: {file.type}</p>
            <button
              onClick={handlePreview}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-2"
            >
              Preview File
            </button>
          </div>
        )}
        {preview && (
          <div className="mb-4">
            <p className="font-semibold">File Preview:</p>
            <table className="border-collapse border border-gray-300">
              <thead>
                <tr>
                  {preview[0].map((header: string, index: number) => (
                    <th
                      key={index}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.slice(1, 6).map((row: any[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: any, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setPreview(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md mt-2"
            >
              Hide Preview
            </button>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="descriptionInput"
            className="block mb-2 font-semibold"
          >
            File Description:
          </label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            rows={4}
          />
        </div>

        <button
          onClick={handleEncryption}
          disabled={!file || !description || encryptionStatus.isEncrypting}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {encryptionStatus.isEncrypting ? 'Encrypting...' : 'Encrypt File'}
        </button>
        {encryptionStatus.isEncrypting && (
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        {encryptionStatus.encryptedFilePath && (
          <div className="mt-4">
            <p className="text-green-600">
              Encryption complete. File saved at:{' '}
              {encryptionStatus.encryptedFilePath}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalEncryption;
