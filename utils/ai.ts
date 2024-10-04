import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { z } from 'zod'

const JournalAnalysis = z
  .object({
    mood: z
      .string()
      .describe(
        'The mood of the journal entry or The mood of the person who wrote the journal entry..',
      ),
    subject: z.string().describe('The subject or theme of the journal entry.'),
    summary: z
      .string()
      .describe(
        'A quick summary of the entire entry that directly addresses the writer.',
      ),
    color: z
      .string()
      .describe(
        'A a hexidecimal color code that represents the mood of the entry.',
      ),
    emotion: z
      .enum(['NEGATIVE', 'NEUTRAL', 'POSITIVE'])
      .describe('The emotional tone, whether neutral, positive or negative.'),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      ),
    emoji: z
      .string()
      .describe(
        'emoji that represents the mood of the entry. Example: 😊 for happiness.',
      ),
  })
  .describe(
    'Journal analysis to provide feedback on mood, subject, summary, color, and emotion.',
  )

export const analyzeEntry = async (entry: string) => {
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-1.5-pro',
    temperature: 0,
    maxRetries: 2,
  })
  const structuredLlm = llm.withStructuredOutput(JournalAnalysis, {
    name: 'JournalAnalysis',
  })
  const aiMsg = await structuredLlm.invoke([
    [
      'system',
      `You are an assistant that analyzes journal entries. Analyze the following journal entry and return a JSON object containing the mood,
      subject, summary, emoji, a color representing the mood, and whether the emotion is NEGATIVE, NEUTRAL or POSITIVE.
      Make sure emotion values are uppercase letters and sentimentScore is rated on a scale from -10 to 10
      Please address the summary directly to the writer, not in the third person.
      Respond with a JSON object formatted like this no matter what:
        {
          "mood": " ",
          "subject": " ",
          "summary": " ",
          "color": " ",
          "emotion": "neutral" or "positive" or "negative"
          "sentimentScore": -10 to 10
          "emoji":""
        }`,
    ],
    ['human', `${entry}`],
  ])
  console.log(aiMsg)
  return aiMsg
}
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
