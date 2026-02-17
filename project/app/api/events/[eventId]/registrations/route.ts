import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(req: Request, { params }: { params: { eventId: string } }) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return NextResponse.json({ success: false, registrations: [] }, { status: 500 })

  try {
    const id = Number(params.eventId)
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY)

    const { data, error } = await svc
      .from('registrations')
      .select('user_id')
      .eq('event_id', id)

    if (error) return NextResponse.json({ success: false, registrations: [] }, { status: 500 })

    return NextResponse.json({ success: true, registrations: (data || []).map((r: any) => r.user_id) })
  } catch (err: any) {
    return NextResponse.json({ success: false, registrations: [] }, { status: 500 })
  }
}
