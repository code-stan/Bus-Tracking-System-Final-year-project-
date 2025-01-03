import { Suspense } from 'react'
import Header from '@/components/Header'
// import BusMap from '@/components/BusMap'
// import BusSchedule from '@/components/BusSchedule'
import SearchFilters from '@/components/SearchFilters'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Bus Tracking System</h1>
        <SearchFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <Suspense fallback={<div>Loading map...</div>}>
            <BusMap />
          </Suspense>
          <Suspense fallback={<div>Loading schedule...</div>}>
            <BusSchedule />
          </Suspense> */}
        </div>
      </div>
    </main>
  )
}

