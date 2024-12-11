import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const schema = {
  description:
    'Journal analysis to provide feedback on mood, subject, summary, color, emotion, and language.',
  type: SchemaType.OBJECT,
  properties: {
    mood: {
      type: SchemaType.STRING,
      description:
        'The mood of the journal entry or the person who wrote it, must be one word.',
      nullable: false,
    },
    subject: {
      type: SchemaType.STRING,
      description: 'The subject or theme of the journal entry.',
      nullable: false,
    },
    summary: {
      type: SchemaType.STRING,
      description:
        'A quick summary of the entire entry that directly addresses the writer.',
      nullable: false,
    },
    color: {
      type: SchemaType.STRING,
      description:
        'A hexadecimal color code that represents the mood of the entry.',
      nullable: false,
    },
    emotion: {
      type: SchemaType.STRING,
      enum: ['NEGATIVE', 'NEUTRAL', 'POSITIVE'],
      description:
        'The emotional tone, whether neutral, positive, or negative (uppercase).',
      nullable: false,
    },
    sentimentScore: {
      type: SchemaType.NUMBER,
      description:
        'Sentiment of the text rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.',
      nullable: false,
    },
    emoji: {
      type: SchemaType.STRING,
      description:
        'Emoji that represents the mood of the entry. Example: 😊 for happiness.',
      nullable: false,
    },
    language: {
      type: SchemaType.STRING,
      description: 'The language of the journal entry.',
      nullable: false,
    },
  },
  required: [
    'mood',
    'subject',
    'summary',
    'color',
    'emotion',
    'sentimentScore',
    'emoji',
    'language',
  ],
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: schema,
  },
})
export const analyzeEntry = async (journalEntry: string, language: string) => {
  const prompt = `
    You are an assistant that analyzes journal entries written in multiple languages.
      The language of response should be in ${language}. Analyze the following journal entry and return a JSON object
      containing the mood (one word), subject, summary (directly addressing the writer), emoji,
      a color representing the mood, emotion (NEGATIVE, NEUTRAL, POSITIVE in uppercase),
      sentimentScore (rated on a scale from -10 to 10), and the detected language (the language the journal entry is written in).
      Please address the summary directly to the writer and ensure the response is in ${language}.

      Journal Entry: ${journalEntry}
  `
  try {
    const result = await model.generateContent(prompt)
    const jsonResponse = JSON.parse(result.response.text())
    return jsonResponse
  } catch (error) {
    console.error('Error analyzing entry:', error)
    throw new Error('Failed to analyze journal entry')
  }
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
