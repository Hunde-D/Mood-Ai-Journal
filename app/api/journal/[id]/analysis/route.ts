import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { NextResponse } from 'next/server'
import { analyzeEntry } from '@/utils/ai'

export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json()
  const analysis = await analyzeEntry(content)

  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
  }

  const updatedAnalysis = await prisma.entryAnalysis.update({
    where: {
      entryId: params.id,
      userId: user.id,
    },
    data: {
      mood: analysis.mood,
      subject: analysis.subject,
      summary: analysis.summary,
      color: analysis.color,
      emotion: analysis.emotion,
      sentimentScore: analysis.sentimentScore,
      emoji: analysis.emoji || '😐',
    },
  })
  return NextResponse.json({ data: updatedAnalysis })
}
