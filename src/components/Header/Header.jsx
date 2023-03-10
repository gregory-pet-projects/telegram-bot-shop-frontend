import { useTelegram } from "../../hooks/useTelegram";
import { tg } from "../../utils/tg";
import { Button } from "../Button/Button";

export const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className="header">
      <Button onClick={onClose}>Close</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};
