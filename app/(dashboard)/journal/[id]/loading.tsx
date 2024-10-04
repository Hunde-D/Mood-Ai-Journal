import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export default Loading
