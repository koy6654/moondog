import { Config } from 'wagmi';
import { ConnectMutate } from 'wagmi/query';

interface ButtonProps {
  key?: string;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ key, label, onClick }) => {
  return (
    <button
      key={key}
      className="w-3/4 bg-white text-black border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
