import Editor from '@/components/Editor'
import { getEntryById } from '@/utils/action'

const page = async ({ params }) => {
  const entry = await getEntryById(params.id)
  console.log(entry)
  return <Editor entry={entry} />
}
export default page
