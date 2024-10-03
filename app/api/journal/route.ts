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
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}

// export const GET
