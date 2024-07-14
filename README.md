# 2PM Data Management Client - Filecoin

## Background

![2PM Network Banner](https://twitter.com/2PM_Network/header_photo)

2PM.Network is a public application network for privacy-computing AI models based on Ethereum security. The name "2PM" represents its three core features: Public, Privacy, and Models.

For more information, visit our official website: [https://app.2pm.network/home](https://app.2pm.network/home)

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
