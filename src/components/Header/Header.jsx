import { tg } from "../../utils/tg";
import { Button } from "../Button/Button";

export const Header = () => {
  const onClose = () => {
    tg.close();
  };

  return (
    <div className="header">
      <Button onClick={onClose}>Close</Button>
      <span className={"username"}>{tg.initDataUnsafe?.user?.username}</span>
    </div>
  );
};
