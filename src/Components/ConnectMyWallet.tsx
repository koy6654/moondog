import * as React from 'react';
import { Connector, useEnsAvatar, useEnsName } from 'wagmi';
import useStaking from '../Hooks/useStaking';
import Button from './Button';
import { ConnectKitButton } from 'connectkit';

const ConnectMyWallet = () => {
  const { connectors, connect, isConnected, address, disconnect } = useStaking();

  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <>
      {isConnected ? (
        <>
          {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
          {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
          <Button label={'Disconnect'} onClick={() => disconnect()} />
        </>
      ) : (
        <ConnectKitButton label={'Connect My Wallet'} />
      )}
    </>
  );
};

export default ConnectMyWallet;
