import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Gate via env
    if (process.env.ANALYTICS_ENABLED === 'false') {
      return new NextResponse(null, { status: 204 })
    }

    const data = await request.json().catch(() => null)

    // Basic validation + allowlist
    const allowed = new Set([
      'speed_dial.shown',
      'speed_dial.open',
      'speed_dial.close',
      'guidance.start',
      'guidance.step',
      'guidance.complete',
      'banner.impression',
      'banner.open',
      'banner.dismiss',
      'action.click',
    ])

    if (!data || typeof data.name !== 'string' || !allowed.has(data.name)) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    // Sampling (0..1); default 0.5 for staging, 1 for prod
    const sampleRate = Math.max(0, Math.min(1, Number(process.env.ANALYTICS_SAMPLE_RATE ?? '0.5')))
    if (Math.random() > sampleRate) {
      return new NextResponse(null, { status: 204 })
    }

    // Minimal logging; replace with your provider SDK or external pipeline
    console.log('[analytics/api]', {
      name: data.name,
      ts: data.ts,
      path: data.path,
      ua: data.ua?.slice?.(0, 120),
    })

    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
