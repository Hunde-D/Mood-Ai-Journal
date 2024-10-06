'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { set } from 'zod'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const promise = async () => {
      try {
        const { data } = await askQuestion(question)
        setAnswer(data)
        setQuestion('')
      } catch (error) {
        setAnswer('Failed to get answer')
        console.log(error)
      }
    }

    toast.promise(promise(), {
      loading: 'Updating analysis...',
      success: () => `Success`,
      error: 'Failed to update analysis',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Chat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat With AI</DialogTitle>
          <DialogDescription>
            Ask any thing about your journal entries
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="rounded-md border border-gray-300 p-2 text-lg"
            placeholder="Ask a question..."
          />
          <button type="submit" className="rounded-md bg-blue-400 px-4 py-2">
            Ask
          </button>
        </form>
        {answer && <p className="my-4 text-xl">{answer}</p>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Question
