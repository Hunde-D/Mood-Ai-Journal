import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const SearchInput = () => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search here..."
        className="w-72 appearance-none bg-background px-8 shadow-none"
      />
    </div>
  )
}

export default SearchInput
