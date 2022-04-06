export enum SubscribedStatus {
  NoSubscriber = 0,
  Subscriber,
  Unknown,
}

// TODO - Navigate through month-year
// TODO - Navigation keyboard
// TODO - Design
// TODO - API server should return when a streamer is not tracked and avoid
// queries to DB
// TODO - Better design 404 errors

export type Ban = {
  channel: string
  username: string
  recent?: string[]
  subscribed: SubscribedStatus
  at: Date
}

export type ExpectedBanResponse = {
  c: string
  u: string
  m: string[]
  s: SubscribedStatus
  t: number
}

export type Cursor = string | undefined
export type Cursors = 'after' | 'before'

export type ExpectedPagination = {
  pagination: Record<Cursors, string | Record<string, never>>
}

export type ExpectedResponse = {
  data: ExpectedBanResponse[]
  pagination: ExpectedPagination
}

export class ValidationError extends Error {
  name = 'ValidationError'
  message = 'Invalid response data'
}

export class FetchError extends Error {
  name = 'FetchError'
  constructor(msg = '') {
    super(msg)
    this.message = msg
  }
}

export function isExpectedResponse(resp: unknown): resp is ExpectedResponse {
  const r = <ExpectedResponse>resp
  const data = r.data
  return (
    Array.isArray(data) &&
    typeof r.pagination === 'object' &&
    isExpectedBanResponse(data)
  )
}

export function isExpectedBanResponse(
  rawBans: unknown[]
): rawBans is ExpectedBanResponse[] {
  if (rawBans.length === 0) {
    // channels without bans for this month
    return true
  }
  const peek = <ExpectedBanResponse>rawBans[0]
  return (
    typeof peek.c === 'string' &&
    typeof peek.u === 'string' &&
    typeof peek.t === 'number'
  )
}

export function format(resp: unknown): Ban[] {
  try {
    if (!isExpectedResponse(resp)) {
      throw new ValidationError()
    }

    const [raw, l] = [resp.data, resp.data.length]
    const bans: Ban[] = new Array<Ban>(l)
    for (let i = 0; i < l; i++) {
      const b = raw[i]
      bans[i] = {
        channel: b.c,
        username: b.u,
        recent: b.m,
        // for saving time and bandwidth server omits subscription status if
        // `SubscribedStatus = 0`
        subscribed: b.s || SubscribedStatus.NoSubscriber,
        at: new Date(b.t * 1000),
      }
    }
    return bans
  } catch (e) {
    if (e instanceof ValidationError) {
      throw e
    }
    throw new ValidationError()
  }
}
