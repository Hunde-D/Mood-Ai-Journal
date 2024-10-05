'use client'
import { Home, LineChart } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
const NavLinks = () => {
  const pathname = usePathname()

  return (
    <Fragment>
      <Link
        href="/journal"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.startsWith('/journal') ? 'text-primary' : ''}`}
      >
        <Home className="h-4 w-4" />
        Journals
      </Link>
      <Link
        href="#"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === '/analytics' ? 'text-primary' : ''}`}
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
    </Fragment>
  )
}
export default NavLinks
