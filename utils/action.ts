'use server'
import prisma from '@/utils/db'
import { getUserByClerkId } from '@/utils/auth'
// import { journalChat } from './ai'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
export const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: { analysis: true },
  })

  return entries
}

export const getAnalytics = async () => {
  const user = await getUserByClerkId()
  const analytics = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
      color: true,
      mood: true,
    },
  })

  return analytics
}

export const getEntryById = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: { analysis: true },
  })

  return entry
}

export const deleteEntry = async (id: string) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized: User not authenticated.')
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      throw new Error(`Entry not found or does not belong to the current user.`)
    }

    // If the entry exists and belongs to the user, proceed with deletion
    await prisma.journalEntry.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: id,
        },
      },
    })
  } catch (e) {
    console.error('Error deleting entry:', e)
    throw new Error('Failed to delete entry.')
  }
  revalidatePath('/journal')
  return { success: true }
}
