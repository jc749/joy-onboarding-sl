import { NextResponse } from 'next/server'

interface Entry {
  id: string
  text: string
  answer: string
  section: string
  layer: string
}

interface SaveRequest {
  db: string
  entries: Entry[]
}

export async function POST(request: Request) {
  const notionKey = process.env.NOTION_API_KEY
  if (!notionKey) {
    return NextResponse.json({ error: 'NOTION_API_KEY not configured' }, { status: 500 })
  }

  const { db, entries }: SaveRequest = await request.json()

  let saved = 0
  let failed = 0

  for (const entry of entries) {
    try {
      const res = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${notionKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: db },
          properties: {
            'Question ID': { title: [{ text: { content: entry.id } }] },
            'Question': { rich_text: [{ text: { content: entry.text } }] },
            'Answer': { rich_text: [{ text: { content: entry.answer } }] },
            'Section': { select: { name: entry.section } },
            'Layer': { select: { name: entry.layer } },
          }
        })
      })
      if (res.ok) saved++; else failed++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ saved, failed })
}
