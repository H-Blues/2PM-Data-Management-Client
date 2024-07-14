# 2PM Data Management Client - Filecoin

## Background

![2PM Network Banner](https://docs.2pm.network/~gitbook/image?url=https%3A%2F%2F2864598578-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FRhLjNEGO5hiT1vh0ATk6%252Fuploads%252FCaShAnxIMCVTjN6iZ4xb%252F1500x500%2520CO.jpeg%3Falt%3Dmedia%26token%3D8eefff4a-c259-4e6f-9fac-7c98b096218b&width=1248&dpr=2&quality=100&sign=ac9be72b&sv=1)

2PM.Network is a public application network for privacy-computing AI models based on Ethereum security. The name "2PM" represents its three core features: Public, Privacy, and Models.

For more information, visit our official website: [https://app.2pm.network/home](https://app.2pm.network/home).

## Introduction

This project extends 2PM's original structure by integrating Zama and Filecoin technologies. It uses Zama for fully homomorphic encryption and uploads the data to Filecoin, ensuring complete confidentiality of user-uploaded data for AI model training. Intriguingly, data providers may receive airdrops if their data is deemed valuable and positively impacts the model.

### Package Procession

Our client is built with Electron and TypeScript, and can be packaged for distribution. Here's the build process:

#### Step 1: Python Setup

- Create a new Python environment
- Use `pyinstaller` to compile `src/py/server.py`: `pyinstaller --onefile server.py`
- Test the compiled `server` executable: `python server.py <function_name>`

#### Step 2: Electron Integration

In components, use `ipcRenderer.invoke` to call Python functions defined in `server.py`:

```javascript
const handleClick = async () => {
  try {
    const result = await window.electron.ipcRenderer.invoke(
      'call-python',
      'fhe',
    );
    console.log('Python script output:', result);
  } catch (error) {
    console.error('Error calling Python script:', error);
  }
};
```

#### Step 3: Build and Test

- Use `npm start` to test
- Use `npm run build` to compile the Electron app

Note: Ensure the compiled Python file (`server`) and the Electron app are in the same folder.
