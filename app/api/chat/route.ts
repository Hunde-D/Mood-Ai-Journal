import { getUserByClerkId } from '@/utils/auth'
import prisma from '@/utils/db'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  try {
    const user = await getUserByClerkId()
    if (!user) {
      return new Response('User not authenticated', { status: 401 })
    }

    const { messages } = await req.json()

    const journalStats = await prisma.journalEntry.aggregate({
      where: { userId: user.id },
      _count: { id: true },
      _min: { createdAt: true },
      _max: { createdAt: true },
    })

    const recentEntries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { analysis: true },
    })

    const systemPrompt = `
You are an AI assistant specialized in analyzing and discussing journal entries. Your role is to provide insightful, empathetic, and helpful responses to users about their journaling practice and personal growth.

User Context:
- The user has been journaling for ${journalStats._count.id} entries.
- Their first entry was on ${journalStats._min.createdAt?.toISOString() || 'N/A'}.
- Their most recent entry was on ${journalStats._max.createdAt?.toISOString() || 'N/A'}.

Recent Journal Entries:
${recentEntries
  .map(
    (entry) => `
- Date: ${entry.createdAt.toISOString()}
  Content: ${entry.content.substring(0, 100)}...
  Emotion: ${entry.analysis?.emotion || 'N/A'}
  Subject: ${entry.analysis?.subject || 'N/A'}
  Sentiment: ${entry.analysis?.sentimentScore || 'N/A'}
`,
  )
  .join('\n')}

Guidelines:
1. Be empathetic and supportive in your responses.
2. Refer to recent journal entries when relevant, but don't quote them directly.
3. Encourage consistent journaling and self-reflection.
4. Offer insights based on patterns or trends you notice in their recent journaling history.
5. Suggest journaling prompts or exercises that align with their current emotional state or recent experiences.
6. Respect privacy and maintain confidentiality. Do not share or ask for personal identifying information.
7. If the user expresses severe distress or mentions self-harm, kindly suggest they seek professional help.

When responding to the user:
- Tailor your language to match their emotional state and writing style.
- Be encouraging but not overly optimistic. Acknowledge both positive and negative emotions.
- Provide actionable advice when appropriate, but avoid being prescriptive.
- If asked about specific journaling techniques or benefits, provide evidence-based information.

Remember, your goal is to support the user's journaling journey and promote their emotional well-being through thoughtful discussion and analysis of their journal entries.
    `

    const result = streamText({
      model: google('models/gemini-1.5-pro-latest'),
      messages,
      system: systemPrompt,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
