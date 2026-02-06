export function formatVrijeme(isoDate: string){
  const date = new Date(isoDate);

  const dayName = date.toLocaleDateString("hr-HR", {
    weekday: "long",
  });

  const time = date.toLocaleTimeString("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} u ${time}`;
};


export function isToday(date: Date){
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export function isThisWeek(date: Date){
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};