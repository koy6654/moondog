// import * as React from 'react';
// import { Connector, useAccount, useEnsAvatar, useEnsName } from 'wagmi';
// import useStaking from '../Hooks/useStaking';
// import Button from './Button';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// // import { ConnectKitButton } from 'connectkit';

// interface ConnectMyWalletButtonProps {
//   disconnect: () => void;
// }

// const ConnectMyWalletButton: React.FC<ConnectMyWalletButtonProps> = ({ disconnect }) => {
//   const { address, isConnected } = useAccount();

//   const { data: ensName } = useEnsName({ address });
//   const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

//   return (
//     <>
//       {isConnected ? (
//         <>
//           {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
//           {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
//           <Button label={'Disconnect'} onClick={() => disconnect()} />
//         </>
//       ) : (
//         // <ConnectKitButton label={'Connect My Wallet'} />
//         <ConnectButton label={'Connect My Wallet'} />
//       )}
//     </>
//   );
// };

// export default ConnectMyWalletButton;
