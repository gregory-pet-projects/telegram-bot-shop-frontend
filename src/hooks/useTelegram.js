export const useTelegram = () => {
  const tg = window.Telegram.WebApp;
  const onClose = () => tg.close();
  const onToggleButton = () => {
    if (tg.MaibButton.isVisible) {
      tg.MaibButton.hide();
    } else {
      tg.MaibButton.show();
    }
  };

  return { tg, onClose, onToggleButton, user: tg.initDataUnsafe?.user };
};
