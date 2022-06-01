import moment from 'moment-mini'

export const MINUTE = 60 * 1000
export const HOUR = MINUTE * 60
export const DAY = HOUR * 24
export const WEEK = 7 * DAY
export const MONTH = DAY * 30
export const YEAR = 365 * DAY

const { abs } = Math

export function padStart(num: any, len = 2, ch = '0'): string {
  let output = `${num}`

  while (output.length < len) {
    output = `${ch}${output}`
  }
  return output
}

export function formatTime(
  time: number | string,
  formatStr = 'YYYY-MM-DD'
): string {
  const d = new Date(time)
  return formatStr
    .replace('YYYY', d.getFullYear().toString())
    .replace('MM', padStart(d.getMonth() + 1))
    .replace('DD', padStart(d.getDate()))
    .replace('HH', padStart(d.getHours()))
    .replace('mm', padStart(d.getMinutes()))
    .replace('ss', padStart(d.getSeconds()))
    .replace('SS', d.getMilliseconds() + '')
}

export const since = function (val: any) {
  const time = moment(val)
  const now = Date.now()

  if (!time.isValid()) {
    return val
  }

  const gapSecond = abs(time.diff(now, 'seconds'))
  const gapMins = abs(time.diff(now, 'minutes'))
  const gapHour = abs(time.diff(now, 'hours'))
  const gapYear = abs(time.diff(now, 'years'))

  // use year
  if (gapYear) {
    return time.format('YY/MM/DD hh:mm:ss')
  }

  // use days
  if (gapHour > 24) {
    return time.format('MM/DD HH:mm:ss')
  }

  if (gapHour >= 1 && gapHour < 24) {
    return gapHour + ' hours ago'
  }

  // use mins
  if (gapMins < 60 && gapMins >= 1) {
    return gapMins + ' mins ago'
  }

  if (gapSecond < 60) {
    return gapSecond + ' secs ago'
  }

  return time.fromNow()
}
