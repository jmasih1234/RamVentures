function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function buildQueries(idea) {
  const base = idea.trim().replace(/\s+/g, ' ')
  return [
    `${base} startup`,
    `${base} competitors`,
    `${base} alternative product`,
    `${base} market size TAM SAM SOM`,
    `${base} pricing benchmark`
  ]
}

async function serperSearch(query, apiKey) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: query, num: 6 })
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`Search provider error: ${msg || res.status}`)
  }

  const data = await res.json()
  const organic = Array.isArray(data?.organic) ? data.organic : []

  return organic.map(item => ({
    title: item?.title || '',
    link: item?.link || '',
    snippet: item?.snippet || ''
  }))
}

function dedupeSources(items) {
  const seen = new Set()
  const out = []

  for (const item of items) {
    const link = (item?.link || '').trim()
    if (!link || seen.has(link)) continue
    seen.add(link)
    out.push(item)
  }

  return out
}

function buildPrompt(idea, sources) {
  return `You are a venture benchmarking analyst. Use only the supplied sources as evidence.

Startup idea:\n${idea}\n
Sources (JSON):\n${JSON.stringify(sources)}\n
Return STRICT JSON with this exact schema:
{
  "idea_summary": "string",
  "existing_solutions": [
    {
      "name": "string",
      "what_it_does": "string",
      "evidence": "string",
      "source_url": "string"
    }
  ],
  "differentiation_opportunities": [
    {
      "opportunity": "string",
      "why_it_is_whitespace": "string",
      "suggested_execution": "string"
    }
  ],
  "financial_snapshot": {
    "tam_notes": "string",
    "sam_notes": "string",
    "som_notes": "string",
    "pricing_benchmarks": ["string"],
    "funding_benchmarks": ["string"],
    "confidence": "low|medium|high"
  },
  "risks": ["string"],
  "next_steps": ["string"]
}

Rules:
- Do not invent companies.
- If evidence is weak, say so explicitly.
- Every item in existing_solutions must include a source_url from provided sources.
- Output JSON only, no markdown.`
}

async function runLlmAnalysis(idea, sources, apiKey, model) {
  const prompt = buildPrompt(idea, sources)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'You are precise, evidence-driven, and never fabricate facts.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  if (!response.ok) {
    const msg = await response.text()
    throw new Error(`LLM provider error: ${msg || response.status}`)
  }

  const json = await response.json()
  const content = json?.choices?.[0]?.message?.content || ''
  const parsed = safeJsonParse(content)

  if (!parsed) {
    throw new Error('Model returned invalid JSON. Please retry.')
  }

  return parsed
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const idea = typeof req.body?.idea === 'string' ? req.body.idea.trim() : ''
  if (!idea || idea.length < 20) {
    return res.status(400).json({ error: 'Please provide a fuller startup idea (at least 20 characters).' })
  }

  const serperApiKey = process.env.SERPER_API_KEY
  const openaiApiKey = process.env.OPENAI_API_KEY
  const openaiModel = process.env.OPENAI_MODEL

  if (!serperApiKey || !openaiApiKey) {
    return res.status(500).json({
      error: 'Missing API keys. Add SERPER_API_KEY and OPENAI_API_KEY to your environment.'
    })
  }

  try {
    const queries = buildQueries(idea).slice(0, 5)
    const searchResults = []

    for (const q of queries) {
      const rows = await serperSearch(q, serperApiKey)
      searchResults.push(...rows)
    }

    const sources = dedupeSources(searchResults).slice(0, 30)
    if (!sources.length) {
      return res.status(404).json({ error: 'No sources found for this idea.' })
    }

    const analysis = await runLlmAnalysis(idea, sources, openaiApiKey, openaiModel)
    return res.status(200).json({ analysis, sources })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Benchmarking failed.' })
  }
}
