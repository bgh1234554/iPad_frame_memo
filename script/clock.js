function clockRun() {
  const phoneClock = document.querySelector('.phone-clock');
  setInterval(() => {
      const now = new Date();
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
      phoneClock.innerHTML = `${nowHours}:${nowMinutes}`;
  }, 1000);
}

clockRun();
