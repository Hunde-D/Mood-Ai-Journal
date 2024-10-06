import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day...!',
      analysis: {
        create: {
          userId: user.id,
          mood: 'not analyzed',
          subject: 'not analyzed',
          summary: 'No summary available',
          color: '#808080',
          sentimentScore: 0,
          emoji: '😐',
        },
      },
    },
    include: { analysis: true },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}

export const GET = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: { analysis: true },
  })

  return NextResponse.json({ data: entries })
}
