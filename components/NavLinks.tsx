'use client'
import { Home, LineChart, UserRoundPen } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
const NavLinks = ({ mobile = false }) => {
  const pathname = usePathname()

  return mobile ? (
    <Fragment>
      <Link
        href="/journal"
        className={`mx-[-0.65rem] mt-5 flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname.startsWith('/journal') ? 'bg-muted text-primary' : 'text-foreground'}`}
      >
        <Home className="h-5 w-5" />
        Journals
      </Link>
      <Link
        href="/analytics"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/analytics' ? 'bg-muted text-primary' : 'text-foreground'}`}
      >
        <LineChart className="h-5 w-5" />
        Analytics
      </Link>
      <Link
        href="/profile"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${pathname === '/profile' ? 'bg-muted text-primary' : 'text-foreground'}`}
      >
        <UserRoundPen className="h-5 w-5" />
        Profile
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <Link
        href="/journal"
        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:text-primary ${pathname.startsWith('/journal') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
      >
        <Home className="h-4 w-4" />
        Journals
      </Link>
      <Link
        href="/analytics"
        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:text-primary ${pathname === '/analytics' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="/profile"
        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:text-primary ${pathname === '/analytics' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
      >
        <UserRoundPen className="h-4 w-4" />
        Profile
      </Link>
    </Fragment>
  )
}
export default NavLinks
