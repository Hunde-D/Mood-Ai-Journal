import { auth } from '@clerk/nextjs/server'
import prisma from '@/utils/db'

export const getUserByClerkId = async () => {
  const { userId } = auth()
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })
  if (!user) {
    return null
  }
  return user
}
