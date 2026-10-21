export function selectLandingEvents(events, now = Date.now()) {
  return events.filter(event => event.published && event.showOnLanding !== false && Number.isFinite(Date.parse(event.date)) && Date.parse(event.date) > now)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || (a.featured && b.featured ? (Number(a.featureOrder) || 0) - (Number(b.featureOrder) || 0) : 0) || Date.parse(a.date) - Date.parse(b.date) || a.id.localeCompare(b.id));
}
export function eventImage(event) {
  if (event.imageUrl) return event.imageUrl;
  const key = event.image || 'music';
  return `/assets/events/${key}.${key.startsWith('ev_') ? 'jpg' : 'webp'}`;
}
export const dateLabel = value => new Intl.DateTimeFormat('en-IN', {day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date(value));
export const timeLabel = value => new Intl.DateTimeFormat('en-IN', {hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date(value));
export const money = value => new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
