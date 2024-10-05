export const formatTime = (updatedAt: string | Date): string => {
  const now = new Date()
  const updatedDate = new Date(updatedAt)
  const timeDifference = now.getTime() - updatedDate.getTime()
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = 7 * oneDay

  const formatTimeEAT = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi',
    })

  if (timeDifference < oneDay) {
    return formatTimeEAT(updatedDate)
  } else if (
    now.getDate() - updatedDate.getDate() === 1 &&
    now.getFullYear() === updatedDate.getFullYear() &&
    now.getMonth() === updatedDate.getMonth()
  ) {
    return `Yesterday at ${formatTimeEAT(updatedDate)}`
  } else if (timeDifference < oneWeek) {
    const daysAgo = Math.floor(timeDifference / oneDay)
    return `${daysAgo} days ago`
  } else {
    return updatedDate.toUTCString()
  }
}
