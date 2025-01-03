'use client'

import Link from 'next/link'
// import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default function Header() {
  const user = true;

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Bus Tracker
        </Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, Admin</span>
              <Button variant="outline" onClick={() => /* implement logout */ null}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

