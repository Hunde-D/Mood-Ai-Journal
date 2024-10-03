import prisma from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user.firstName + ' ' + user.lastName,
      },
    })
  }
  redirect('/journal')
}
const page = async () => {
  await createNewUser()
  return <div className="text-2xl text-black">...loading</div>
}
export default page
