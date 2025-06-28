export const getEvents = async (token: string, timeMin?: string, timeMax?: string) => {
  let url = '/api/calendar/events';
  if (timeMin && timeMax) {
    url += `?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;
  }
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

export const createEvent = async (token: string, eventDetails: any) => {
  const res = await fetch('/api/calendar/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventDetails)
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
};

export const updateEvent = async (token: string, eventId: string, eventDetails: any) => {
  const res = await fetch(`/api/calendar/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventDetails)
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
};

export const deleteEvent = async (token: string, eventId: string) => {
  const res = await fetch(`/api/calendar/events/${eventId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete event');
  return res.json();
}; 