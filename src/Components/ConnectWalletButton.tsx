import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import shape from './shape.svg';
import '../Styles/MainDashboard.css';

const ConnectMyWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className="connect-wallet"
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
                  <div className="label-and-icons">
                    <div className="label-wrapper">
                      <button className="button" onClick={openConnectModal} type="button">
                        Connect My Wallet
                      </button>
                    </div>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className="button" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    className="button"
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button className="button" onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
            {/* <img className="shape" alt="Shape" src={shape} /> */}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectMyWalletButton;
