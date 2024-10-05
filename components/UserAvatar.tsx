'use client'
import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/clerk-react'
import { Skeleton } from './ui/skeleton'
const UserAvatar = () => {
  const { isLoaded } = useUser()
  if (!isLoaded) return <Skeleton className="h-9 w-9"></Skeleton>
  return <UserButton />
}
export default UserAvatar
