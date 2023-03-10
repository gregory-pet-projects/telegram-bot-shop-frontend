import { useEffect } from "react";
import { tg } from "../../utils/tg";
import { Button } from "../Button/Button";

export const Header = (props) => {
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
