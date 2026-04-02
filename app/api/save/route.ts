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
  const apiKey = process.env.ANTHROPIC_API_KEY
  const notionToken = process.env.NOTION_MCP_TOKEN
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
  }
  if (!notionToken) {
    return NextResponse.json({ error: 'NOTION_MCP_TOKEN not configured' }, { status: 500 })
  }

  const { db, entries }: SaveRequest = await request.json()

  let saved = 0
  let failed = 0

  for (const entry of entries) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'mcp-client-2025-04-04',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a Notion API assistant. Create a page in Notion database ID "${db}" with these exact properties:
- Question ID (title): "${entry.id}"
- Question (rich_text): ${JSON.stringify(entry.text)}
- Answer (rich_text): ${JSON.stringify(entry.answer)}
- Section (select): "${entry.section}"
- Layer (select): "${entry.layer}"
Respond only with "created".`,
          messages: [{ role: 'user', content: `Create page for ${entry.id}.` }],
          mcp_servers: [{
            type: 'url',
            url: 'https://mcp.notion.com/mcp',
            name: 'notion-mcp',
            authorization_token: notionToken
          }]
        })
      })
      if (res.ok) saved++; else failed++
    } catch {
      failed++
    }
  }

  return NextResponse.json({ saved, failed })
}
