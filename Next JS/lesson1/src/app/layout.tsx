import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <html lang="en">
      <body>
        <main>
          <nav>
              <Link href="/about">About</Link>
              <Link href="/home">Home</Link>
              <Link href="/contact">Contact</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}

export default DashboardLayout