export const formatTime = (updatedAt: string | Date): string => {
  const now = new Date()
  const updatedDate = new Date(updatedAt)
  const timeDifference = now.getTime() - updatedDate.getTime() // Difference in milliseconds
  const oneDay = 24 * 60 * 60 * 1000 // Milliseconds in a day
  const oneWeek = 7 * oneDay

  if (timeDifference < oneDay) {
    // Less than 24 hours ago, display only time
    return updatedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (
    now.getDate() - updatedDate.getDate() === 1 &&
    now.getFullYear() === updatedDate.getFullYear() &&
    now.getMonth() === updatedDate.getMonth()
  ) {
    // If it's exactly yesterday
    return `Yesterday at ${updatedDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  } else if (timeDifference < oneWeek) {
    // Less than 7 days ago, show X days ago
    const daysAgo = Math.floor(timeDifference / oneDay)
    return `${daysAgo} days ago`
  } else {
    // More than a week ago, display full date
    return updatedDate.toDateString()
  }
}
