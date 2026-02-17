export async function createEvent(payload: any) {
  try {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
      return { success: false, error: error?.error ?? 'Request failed' }
    }
    return res.json()
  } catch (err: any) {
    console.error('createEvent error:', err)
    return { success: false, error: err?.message ?? 'Network error' }
  }
}

export async function registerForEvent(eventId: number) {
  try {
    const res = await fetch('/api/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId }),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
      return { success: false, error: error?.error ?? 'Request failed' }
    }
    return res.json()
  } catch (err: any) {
    console.error('registerForEvent error:', err)
    return { success: false, error: err?.message ?? 'Network error' }
  }
}

export async function getMyRegistrations() {
  try {
    const res = await fetch('/api/events/me')
    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}` }
    }
    return res.json()
  } catch (err: any) {
    console.error('getMyRegistrations error:', err)
    return { success: false, error: err?.message ?? 'Network error' }
  }
}
export async function unregisterFromEvent(eventId: number) {
  try {
    const normalizedEventId = Number(eventId)
    if (!Number.isFinite(normalizedEventId) || normalizedEventId <= 0) {
      return { success: false, error: 'Invalid event id' }
    }

    const res = await fetch(`/api/events/${normalizedEventId}/unregister`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: normalizedEventId }),
    })
    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
      return { success: false, error: error?.error ?? 'Request failed' }
    }
    return res.json()
  } catch (err: any) {
    console.error('unregisterFromEvent error:', err)
    return { success: false, error: err?.message ?? 'Network error' }
  }
}

export async function getEventRegistrations(eventId: number) {
  try {
    const res = await fetch(`/api/events/${eventId}/registrations`)
    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}` }
    }
    return res.json()
  } catch (err: any) {
    console.error('getEventRegistrations error:', err)
    return { success: false, error: err?.message ?? 'Network error' }
  }
}
