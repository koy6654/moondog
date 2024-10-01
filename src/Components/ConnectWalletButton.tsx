import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import shape from './shape.svg';
import './Components.css';
import FingerLeft from '../Assets/Images/FingerLeft.png';
import FingerRight from '../Assets/Images/FingerRight.png';

const ConnectMyWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className="connect-wallet h-full w-full"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="h-full w-full">
                    <button className="button" onClick={openConnectModal}>
                      <div className="flex justify-center items-center space-x-8">
                        <img src={FingerLeft} alt="Left" className="w-8 h-8" />
                        <span className="font-concert-one text-3xl">Connect Wallet</span>
                        <img src={FingerRight} alt="Right" className="w-8 h-8" />
                      </div>
                    </button>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <div className="h-full w-full font-concert-one text-3xl">
                    <button className="button" onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  </div>
                );
              }
              return (
                <div className="h-full w-full flex gap-4 font-concert-one text-3xl overflow-hidden">
                  {/* <button
                    className="button"
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div className={`bg-[${chain.iconBackground}] w-3 h-3 rounded-full overflow-hidden mr-1`}>
                        {chain.iconUrl && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  <button className="button" onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectMyWalletButton;
