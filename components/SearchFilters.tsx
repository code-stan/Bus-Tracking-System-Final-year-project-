'use client'

import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SearchFilters() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search routes, stops, or schedules"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}

