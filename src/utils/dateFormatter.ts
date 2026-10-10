export function getBaseDateTime() {
  const now = new Date();

  if (now.getMinutes() < 40) {
    now.setHours(now.getHours() - 1);
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");

  return {
    baseDate: `${year}${month}${day}`,
    baseTime: `${hours}00`,
  };
}
