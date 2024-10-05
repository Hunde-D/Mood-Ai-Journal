import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { CommandDialogDemo } from './QuestionDialog'

const SearchInput = () => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="w-72 appearance-none bg-background px-8 shadow-none"
      />
      <div className="absolute right-2.5 text-sm text-muted-foreground">
        <CommandDialogDemo />
      </div>
    </div>
  )
}
export default SearchInput
