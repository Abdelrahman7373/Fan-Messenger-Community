import { IconType } from "react-icons";

interface AuthButtonsProps {
    icon: IconType,
    onClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ icon: Icon, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md px-4 py-4 text-gray-500 shadow-sm ring-1 ring-insert ring-gray-300 hover:ng-gray-50 foucus:outline-offset-0">
      <Icon />
    </button>
  )
}

export default AuthButtons
