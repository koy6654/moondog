import './Styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import WagmiProvider from './WagmiProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <WagmiProvider>
        <App />
      </WagmiProvider>
    </RecoilRoot>
  </React.StrictMode>
);
