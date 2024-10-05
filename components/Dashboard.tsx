import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ThemeSwitch from '@/components/ThemeSwitch'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import NavLinks from './NavLinks'
import SearchInput from './SearchInput'
import UserAvatar from './UserAvatar'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full overflow-hidden md:grid-cols-[190px_1fr] lg:grid-cols-[200px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <p className="flex h-6 w-6 items-center gap-4 text-lg">
                😎
                <span className="hover:text-primary">Mood</span>
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLinks />
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="A card with a call to action">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="text-[1.02rem]">Like My Work?</CardTitle>
                <CardDescription className="text-xs">
                  Check out my other projects and see what else I have to offer!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Explore More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-5 text-lg font-semibold"
                >
                  <ThemeSwitch />
                  <p className="mx-3 flex h-6 w-6 items-center gap-4 text-xl">
                    Mood
                  </p>
                </Link>
                <NavLinks mobile />
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Like My Work?</CardTitle>
                    <CardDescription>
                      Check out my other projects and see what else I have to
                      offer!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Explore More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex h-full w-full flex-1 items-center justify-end gap-5 max-sm:mr-2">
            <SearchInput />
            <div className="max-sm:hidden">
              <ThemeSwitch />
            </div>
            <div className="sm:hidden">
              <UserAvatar />
            </div>
          </div>
          <Card className="grid h-9 w-9 justify-center max-sm:hidden">
            <UserAvatar />
          </Card>
        </header>
        <main className="flex-1 p-4 pb-0">{children}</main>
      </div>
    </div>
  )
}
