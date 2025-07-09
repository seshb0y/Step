import Link from 'next/link'
import React from 'react'


function page() {
  return (
    <nav>
        <Link href="/about">About</Link>
        <Link href="/home">Home</Link>
        <Link href="/contact">Contact</Link>
    </nav>
  )
}

export default page