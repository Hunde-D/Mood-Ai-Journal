import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Settings } from 'lucide-react'
import ResponseLanguage from './response-lang-select'

export function JournalOptions() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Settings size={20} strokeWidth={1.25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Journal Configuration</SheetTitle>
          <SheetDescription>
            Update your journal settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="h-fit py-5">
          <ResponseLanguage />
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
