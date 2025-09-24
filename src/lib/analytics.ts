// Lightweight client-side analytics utility.
// Starts with console logging only; can be swapped to sendBeacon/fetch later.

export type AnalyticsEventName =
  | 'speed_dial.shown'
  | 'speed_dial.open'
  | 'speed_dial.close'
  | 'guidance.start'
  | 'guidance.step'
  | 'guidance.complete'
  | 'banner.impression'
  | 'banner.open'
  | 'banner.dismiss'
  | 'action.click';

export type AnalyticsPayload = Record<string, unknown> | undefined;

let isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false';

export function setAnalyticsEnabled(enabled: boolean) {
  isEnabled = enabled;
}

export function track(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  try {
    if (!isEnabled) return;
    const record = {
      name,
      payload: payload || {},
      ts: Date.now(),
    };
    // Default: console output for debugging; replace with sendBeacon/fetch when ready
    if (typeof window !== 'undefined' && 'console' in window) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', record);
    }
  } catch {
    // no-op
  }
}