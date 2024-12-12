interface NoResultMessageProps {
  message: string;
}

const NoResultMessage: React.FC<NoResultMessageProps> = ({ message }) => {
  return <h1 className="text-gray-700 text-md font-bold text-left mb-2">{message}</h1>;
};

export default NoResultMessage;
