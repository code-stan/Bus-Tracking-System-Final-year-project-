import { NextResponse } from "next/server"


export const GET = async(request: any) => {

  const { searchParams } = new URL(request?.url);
  const searchQuery = searchParams.get("data")
  return (
    NextResponse.json({data: searchQuery})
  )
}

export default GET