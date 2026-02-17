export const registrations: Record<number, string[]> = {};

export function isRegistered(eventId: number, userId: string) {
  const list = registrations[eventId] || [];
  return list.includes(userId);
}

export function addRegistration(eventId: number, userId: string) {
  if (!registrations[eventId]) registrations[eventId] = [];
  if (!registrations[eventId].includes(userId)) registrations[eventId].push(userId);
}

export function removeRegistration(eventId: number, userId: string) {
  if (!registrations[eventId]) return;
  registrations[eventId] = registrations[eventId].filter((id) => id !== userId);
}
