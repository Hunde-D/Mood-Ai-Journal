import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json()
  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
  }

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  revalidatePath(`/journal/${params.id}`)
  return NextResponse.json({ data: updatedEntry })
}
