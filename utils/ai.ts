import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { moodTags } from './data'

const analyzeEntrySchema = z.object({
  analysis: z.object({
    mood: z.string().describe('One-word mood of the journal entry or writer.'),
    subject: z.string().describe('Main subject or theme of the journal entry.'),
    summary: z
      .string()
      .describe('Concise summary addressing the writer directly.'),
    color: z
      .string()
      .describe("Hexadecimal color code representing the entry's mood."),
    emotion: z
      .enum(['NEGATIVE', 'NEUTRAL', 'POSITIVE'])
      .describe('Overall emotional tone.'),
    sentimentScore: z
      .number()
      .min(-10)
      .max(10)
      .describe(
        'Sentiment scale from -10 (very negative) to 10 (very positive).',
      ),
    emoji: z.string().describe("Single emoji representing the entry's mood."),
    recommendation: z
      .string()
      .max(100)
      .describe('Short, actionable advice aligned with the mood.'),
    language: z.string().describe('Detected language of the journal entry.'),
    tags: z
      .array(z.enum(moodTags))
      .describe('Array of mood tags that apply to the entry.'),
  }),
})

export const analyzeEntry = async (journalEntry: string, language: string) => {
  try {
    const { object } = await generateObject({
      model: google('gemini-1.5-pro-latest'),
      schema: analyzeEntrySchema,
      prompt: `
        You are an empathetic AI assistant specializing in analyzing journal entries.
        Analyze the following journal entry and provide insights. Respond in ${language}.

        Guidelines:
        1. Mood: Capture the predominant feeling in one word.
        2. Subject: Identify the main topic or theme.
        3. Summary: Provide a brief, personalized summary directly addressing the writer.
        4. Color: Choose a hex color that best represents the entry's mood.
        5. Emotion: Categorize as NEGATIVE, NEUTRAL, or POSITIVE.
        6. Sentiment Score: Rate from -10 (extremely negative) to 10 (extremely positive).
        7. Emoji: Select one emoji that encapsulates the entry's mood.
        8. Recommendation: Offer a short, actionable suggestion (max 100 characters) tailored to the mood and content.
        9. Language: Detect and specify the language used in the entry.
        10. Tags: Select 1-3 mood tags from the provided list that best describe the entry's emotional state.

        Mood Tags:
        ${moodTags.join(', ')}

        Remember:
        - Be sensitive and supportive in your analysis.
        - Ensure recommendations are helpful and mood-appropriate.
        - Maintain a non-judgmental tone throughout the analysis.
        - Choose tags that accurately reflect the nuances of the entry's mood.

        Journal Entry:
        "${journalEntry}"

        Provide your analysis in a structured JSON format as per the defined schema.
      `,
    })

    console.log('Analysis result:', object.analysis)
    return object.analysis
  } catch (error) {
    console.error('Error analyzing entry:', error)
    throw new Error('Failed to analyze journal entry')
  }
}

// Note: The journalChat function would need to be refactored separately,
// as it uses different models and embedding functionality not directly
// supported by the AI SDK in the same way.

// export const journalChat = async (
//   message: string,
//   journalHistory: EntryAnalysis[],
// ) => {
//   console.log('3:', message)
//   const model2 = genAI.getGenerativeModel({ model: 'text-embedding-004' })
//   const result2 = await model2.embedContent(JSON.stringify(journalHistory))
//   console.log('emb', result2.embedding.values)

//   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
//   const history = journalHistory.map((entry) => ({
//     role: 'user', // Assuming user role for all history entries
//     parts: [
//       {
//         text: `${entry.createdAt},${entry.mood},${entry.summary},${entry.emotion},${entry.createdAt},${entry.sentimentScore},`,
//       },
//     ], // Use the summary as the content part
//   }))

//   const chat = model.startChat({
//     history: history, // Transformed history
//   })

//   const result = await chat.sendMessage(message)
//   console.log('result:', result.response.text())
//   return result.response.text()
// }
//   try {
//     return parser.parse(output)
//   } catch (e) {
//     const fixParser = OutputFixingParser.fromLLM(
//       new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
//       parser,
//     )
//     const fix = await fixParser.parse(output)
//     return fix
//   }

// export const qa = async (question, entries) => {
//   const docs = entries.map(
//     (entry) =>
//       new Document({
//         pageContent: entry.content,
//         metadata: { source: entry.id, date: entry.createdAt },
//       }),
//   )
//   const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
//   const chain = loadQARefineChain(model)
//   const embeddings = new OpenAIEmbeddings()
//   const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
//   const relevantDocs = await store.similaritySearch(question)
//   const res = await chain.call({
//     input_documents: relevantDocs,
//     question,
//   })

//   return res.output_text
// }

// ==============================
// const parser = StructuredOutputParser.fromZodSchema(
//   z.object({
//     mood: z
//       .string()
//       .describe('the mood of the person who wrote the journal entry.'),
//     subject: z.string().describe('the subject of the journal entry.'),
//     negative: z
//       .boolean()
//       .describe(
//         'is the journal entry negative? (i.e. does it contain negative emotions?).',
//       ),
//     summary: z.string().describe('quick summary of the entire entry.'),
//     color: z
//       .string()
//       .describe(
//         ' Example #0101fe for blue representing happiness.',
//       ),
//     sentimentScore: z
//       .number()
//       .describe(
//         'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
//       ),
//   }),
// )

// ======
// const getPrompt = async (content) => {
//   const format_instructions = parser.getFormatInstructions()

//   const prompt = new PromptTemplate({
//     template:
//       'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
//     inputVariables: ['entry'],
//     partialVariables: { format_instructions },
//   })

//   const input = await prompt.format({
//     entry: content,
//   })

//   return input
// }
