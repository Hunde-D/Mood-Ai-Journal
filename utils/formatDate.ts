import { useEffect, useState } from 'react'

const useClientFormattedTime = (updatedAt: string | Date) => {
  const [formattedTime, setFormattedTime] = useState('')

  useEffect(() => {
    const now = new Date()
    const updatedDate = new Date(updatedAt)
    const timeDifference = now.getTime() - updatedDate.getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const oneWeek = 7 * oneDay

    const formatTimeClient = (date: Date) =>
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })

    if (timeDifference < oneDay) {
      setFormattedTime(formatTimeClient(updatedDate))
    } else if (
      now.getDate() - updatedDate.getDate() === 1 &&
      now.getFullYear() === updatedDate.getFullYear() &&
      now.getMonth() === updatedDate.getMonth()
    ) {
      setFormattedTime(`Yesterday at ${formatTimeClient(updatedDate)}`)
    } else if (timeDifference < oneWeek) {
      const daysAgo = Math.floor(timeDifference / oneDay)
      setFormattedTime(`${daysAgo} days ago`)
    } else {
      setFormattedTime(updatedDate.toDateString())
    }
  }, [updatedAt])

  return formattedTime
}

export default useClientFormattedTime
