'use client'
import { useState } from 'react'

const DB = '2b5e1a33-e63f-456e-9a7e-e45b4ef7b273'

const sections = [
  {
    id: 'role', title: 'Role Pursuit',
    sub: "What Joy is chasing and what she'd pass on. Feeds the role opportunity scoring engine.",
    layer: 'Decision Intelligence',
    questions: [
      { id: 'RP01', text: 'Where is Joy in her career priority right now?', type: 'toggle', options: ['TV first', 'Film first', 'Both equally', 'Transitioning from TV to film'] },
      { id: 'RP02', text: 'Which role type is she most actively pursuing?', type: 'multi', options: ['Series lead', 'Limited series lead', 'Ensemble prestige TV', 'Supporting film', 'Lead film', 'Recurring TV', 'Voice / animation', 'Documentary / unscripted'] },
      { id: 'RP03', text: 'Which genres feel most authentic to her right now?', type: 'multi', options: ['Psychological thriller', 'Prestige drama', 'Horror', 'Dark comedy', 'Sci-fi', 'Period drama', 'Action', 'Romance', 'Comedy', 'Crime'] },
      { id: 'RP04', text: 'What would she pass on without hesitation?', type: 'multi', warn: true, options: ['Fast-turnaround network procedurals', 'Reality / unscripted', 'Low-budget indie', 'International co-production', 'Animation', 'Sequels / franchise work', 'Romantic comedy', 'Action blockbuster'] },
      { id: 'RP05', text: 'Is a transition from ensemble to lead a priority right now?', type: 'toggle', options: ['Yes — top priority', 'Yes — but not urgent', 'No — ensemble is fine for now', 'Already making the transition'] },
      { id: 'RP06', text: 'Which studios or networks is she prioritizing?', type: 'multi', options: ['HBO / Max', 'Netflix', 'Apple TV+', 'Amazon / MGM', 'FX / Hulu', 'A24', 'Searchlight', 'Universal', 'Warner Bros', 'Sony', 'Paramount', 'Disney / Touchstone'] },
      { id: 'RP07', text: "Is there a specific character arc she wants to play that she hasn't yet?", type: 'text', hint: 'Describe the role or arc in a sentence or two.' },
      { id: 'RP08', text: 'What was the last role she passed on, and why?', type: 'text', hint: 'No names needed — just the reasoning.' },
      { id: 'RP09', text: "What was the last role she regrets not taking?", type: 'text', hint: '' },
      { id: 'RP10', text: 'Anything else about her role priorities COMMANDIO should know?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'brand', title: 'Brand Deals',
    sub: "What Joy will and won't do. Makes brand scoring and pitch generation precise.",
    layer: 'Decision Intelligence',
    questions: [
      { id: 'BD01', text: 'Which brand categories is she most open to?', type: 'multi', options: ['Beauty / skincare', 'Fashion / apparel', 'Luxury', 'Wellness / health', 'Tech / consumer electronics', 'Entertainment / streaming', 'Jewelry / accessories', 'Footwear', 'Food / beverage', 'Home / lifestyle', 'Travel', 'Automotive', 'Financial services'] },
      { id: 'BD02', text: 'Which categories will she not do regardless of the deal?', type: 'multi', warn: true, options: ['Fast fashion', 'Alcohol / spirits', 'Tobacco / vaping', 'Pharma / supplements', 'Crypto / NFT', 'Gambling', 'Fast food', 'Political / advocacy', 'Firearms', 'Payday / predatory finance'] },
      { id: 'BD03', text: 'What type of brand work does she prefer?', type: 'multi', options: ['Long-term ambassador', 'Editorial / print campaign', 'Social media campaign', 'Event / red carpet appearance', 'Product collaboration', 'Creative director role', 'Equity / ownership stake', 'One-off sponsored content'] },
      { id: 'BD04', text: 'Is she open to performance-based social content deals?', type: 'toggle', options: ['Yes', 'No', 'Depends on the brand', 'Only for ambassador-level deals'] },
      { id: 'BD05', text: 'What does her ideal brand partner look like?', type: 'text', hint: 'Values, aesthetic, prestige level, audience fit.' },
      { id: 'BD06', text: 'Does she have existing exclusivity in any category?', type: 'text', hint: 'List category and expiry if known.' },
      { id: 'BD07', text: "Brands already in conversation or recently pitched?", type: 'tags', hint: 'Add one brand per entry.' },
      { id: 'BD08', text: "Brands she personally loves that haven't approached her yet?", type: 'tags', hint: 'Add one brand per entry.' },
      { id: 'BD09', text: 'Any brand relationships to actively avoid or distance from?', type: 'text', hint: '' },
      { id: 'BD10', text: 'Anything else about brand strategy COMMANDIO should factor in?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'relationships', title: 'Relationships',
    sub: 'Who she wants proximity to. Feeds First Mover Alerts and relationship investment tracking.',
    layer: 'Decision Intelligence',
    questions: [
      { id: 'RL01', text: 'Which directors would she drop everything for right now?', type: 'tags', hint: 'These become First Mover triggers — any news about these names flags immediately.' },
      { id: 'RL02', text: 'Which writers or showrunners is she most eager to work with?', type: 'tags', hint: '' },
      { id: 'RL03', text: 'Which producers does she want a relationship with?', type: 'tags', hint: '' },
      { id: 'RL04', text: 'Which casting directors are most important to her right now?', type: 'tags', hint: '' },
      { id: 'RL05', text: 'Which studio or network executives is her team cultivating?', type: 'tags', hint: '' },
      { id: 'RL06', text: "Peers or co-stars whose career paths she's watching as a model?", type: 'tags', hint: '' },
      { id: 'RL07', text: 'Which relationships is her team actively investing in right now?', type: 'text', hint: '' },
      { id: 'RL08', text: 'Are there relationships that have cooled or need rebuilding?', type: 'text', hint: 'No names needed — directional is fine.' },
      { id: 'RL09', text: 'Who in the industry has been most influential to her career so far?', type: 'text', hint: '' },
      { id: 'RL10', text: 'Anything else about her relationship landscape COMMANDIO should know?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'narrative', title: 'Narrative & Press',
    sub: 'The story Joy wants told, where, and by whom.',
    layer: 'Decision Intelligence',
    questions: [
      { id: 'NP01', text: 'What is the narrative her team is actively building right now?', type: 'text', hint: 'The story you want the industry to tell about her.' },
      { id: 'NP02', text: 'Which publications matter most to her career right now?', type: 'multi', options: ['Deadline', 'Variety', 'The Hollywood Reporter', 'The New York Times', 'Vogue', 'ELLE', 'InStyle', "Harper's Bazaar", 'Rolling Stone', 'Vanity Fair', 'W Magazine', 'Interview', 'The Cut', 'Allure'] },
      { id: 'NP03', text: 'How much does she want to be in the press right now?', type: 'toggle', options: ['High visibility — as much as possible', 'Selective — right stories only', 'Low — heads down right now', 'Award-season specific only'] },
      { id: 'NP04', text: 'Is there a specific awards strategy in play?', type: 'toggle', options: ['Yes — active Emmy campaign', 'Yes — active Oscar campaign', 'Both', 'Not yet — building toward it', 'No awards focus right now'] },
      { id: 'NP05', text: 'Are there journalists she has strong relationships with?', type: 'tags', hint: '' },
      { id: 'NP06', text: 'Are there journalists or publications to avoid?', type: 'tags', hint: '' },
      { id: 'NP07', text: 'What does she want audiences to associate with her name in 3 years?', type: 'text', hint: '' },
      { id: 'NP08', text: "Are there topics she won't discuss publicly?", type: 'text', hint: '' },
      { id: 'NP09', text: "Is there a profile story she's been waiting for the right moment to give?", type: 'text', hint: '' },
      { id: 'NP10', text: 'Are there any existing narratives she wants to correct or get ahead of?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'timing', title: 'Timing & Pivots',
    sub: 'When to move and when to wait. Feeds urgency scoring and Daily Brief prioritization.',
    layer: 'Decision Intelligence',
    questions: [
      { id: 'TP01', text: 'What is her current availability and bandwidth?', type: 'toggle', options: ['Actively looking — wide open', 'In a project — available for development', 'Heads down — not available for 3+ months', 'In negotiation on something specific'] },
      { id: 'TP02', text: 'Is a major pivot in play right now?', type: 'multi', options: ['Genre shift', 'Platform shift (TV to film or vice versa)', 'Lead transition', 'Geographic expansion', 'Medium shift (producing, directing, writing)', 'Brand focus increase', 'Press visibility shift', 'None right now'] },
      { id: 'TP03', text: 'Are there upcoming releases or announcements that will change her landscape?', type: 'text', hint: 'Project names, release windows, anything creating a moment.' },
      { id: 'TP04', text: 'Are there deals in progress close to closing?', type: 'toggle', options: ['Yes — multiple', 'Yes — one', 'No', "Can't disclose"] },
      { id: 'TP05', text: 'Which industry calendar moments are most important right now?', type: 'multi', options: ['Emmy campaign season', 'Oscar campaign season', 'Pilot season', 'Sundance', 'Cannes', 'TIFF', 'Upfronts', 'Met Gala', 'NYFW', 'Coachella', 'SAG Awards', 'Golden Globes'] },
      { id: 'TP06', text: 'Is there a critical window in the next 6–12 months her team is targeting?', type: 'text', hint: '' },
      { id: 'TP07', text: 'What would trigger a major strategy shift for her team right now?', type: 'text', hint: '' },
      { id: 'TP08', text: 'How does she respond to urgency?', type: 'toggle', options: ['Fast — moves quickly when the right thing appears', 'Deliberate — takes time to decide', 'Depends on the category', 'Manager-led — her team advises the pace'] },
      { id: 'TP09', text: 'Is there anything her team is actively trying to slow down or pause?', type: 'text', hint: '' },
      { id: 'TP10', text: 'Anything else about timing COMMANDIO should factor into daily intelligence?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'financial', title: 'Financial',
    sub: "What she's optimizing for. Balances intelligence outputs between visibility and income priorities.",
    layer: 'Decision Intelligence',
    questions: [
      { id: 'FN01', text: 'Right now Joy is primarily optimizing for:', type: 'toggle', options: ['Career capital — visibility over money', 'Income — needs paying work', 'Both equally', 'Building long-term equity'] },
      { id: 'FN02', text: 'Is she interested in building equity in anything?', type: 'multi', options: ['Production company', 'A consumer brand', 'Real estate / property', 'Investment portfolio', 'Tech / startup', 'Music / creative IP', 'None right now'] },
      { id: 'FN03', text: 'What is her tolerance for passion projects vs. paying work?', type: 'toggle', options: ['Passion projects first', 'Paying work first', 'Balanced — 50/50', 'Paying work funds the passion projects'] },
      { id: 'FN04', text: 'Has she turned down high-paying work because of career positioning?', type: 'toggle', options: ['Yes — regularly', 'Yes — occasionally', 'No', 'Prefers not to say'] },
      { id: 'FN05', text: 'Is there a minimum deal threshold for brand work to be worth pursuing?', type: 'toggle', options: ["Yes — I'll specify in notes", 'No hard floor', 'Depends on the brand', 'Strategic value can offset lower fee'] },
      { id: 'FN06', text: "Are there income streams she wants to develop that don't currently exist?", type: 'text', hint: '' },
      { id: 'FN07', text: 'Are there financial priorities that affect which projects she can realistically take?', type: 'text', hint: 'Geography, timing, rate requirements — anything relevant.' },
      { id: 'FN08', text: 'Does she have a business manager making long-term investment decisions?', type: 'toggle', options: ['Yes', 'No', 'In progress'] },
      { id: 'FN09', text: 'Are there specific financial goals her team factors into opportunity decisions?', type: 'text', hint: 'Directional is fine — no specifics needed.' },
      { id: 'FN10', text: 'Anything else about financial priorities COMMANDIO should weigh?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'people', title: 'People Watchlist',
    sub: 'Every name here becomes a monitored entity. COMMANDIO flags any trade coverage, casting news, or deal activity involving these people.',
    layer: 'Tracker Configuration',
    questions: [
      { id: 'PW01', text: 'Directors to watch — any project they attach to flags immediately.', type: 'tags', hint: 'Add one name at a time.' },
      { id: 'PW02', text: 'Writers and showrunners to watch.', type: 'tags', hint: '' },
      { id: 'PW03', text: 'Producers to watch.', type: 'tags', hint: '' },
      { id: 'PW04', text: 'Casting directors to watch.', type: 'tags', hint: '' },
      { id: 'PW05', text: 'Studio and network executives to watch.', type: 'tags', hint: '' },
      { id: 'PW06', text: 'Peers and co-stars whose career moves to track.', type: 'tags', hint: '' },
      { id: 'PW07', text: 'Agents, managers, or entertainment lawyers at other firms worth monitoring.', type: 'tags', hint: '' },
      { id: 'PW08', text: 'Brand partnerships executives or CMOs whose moves matter.', type: 'tags', hint: '' },
      { id: 'PW09', text: "Journalists, editors, or critics whose coverage matters most.", type: 'tags', hint: '' },
      { id: 'PW10', text: 'Any other industry figures who belong on a watchlist.', type: 'tags', hint: '' },
    ]
  },
  {
    id: 'brands', title: 'Brand Watchlist',
    sub: "Brands her team is actively pursuing or watching. Layered on top of the audience affinity data.",
    layer: 'Tracker Configuration',
    questions: [
      { id: 'BW01', text: 'Beauty and skincare brands to watch.', type: 'tags', hint: '' },
      { id: 'BW02', text: 'Fashion and apparel brands to watch.', type: 'tags', hint: '' },
      { id: 'BW03', text: 'Luxury brands to watch.', type: 'tags', hint: '' },
      { id: 'BW04', text: 'Streaming and entertainment brands to watch.', type: 'tags', hint: '' },
      { id: 'BW05', text: 'Wellness and lifestyle brands to watch.', type: 'tags', hint: '' },
      { id: 'BW06', text: 'Tech and consumer electronics brands to watch.', type: 'tags', hint: '' },
      { id: 'BW07', text: 'Retail and other brands to watch.', type: 'tags', hint: '' },
      { id: 'BW08', text: 'Brands in active conversations — flag for priority monitoring.', type: 'tags', hint: 'These get same-day alerts on any deal news.' },
      { id: 'BW09', text: "Brands that have approached her team but haven't gotten a response yet.", type: 'tags', hint: '' },
      { id: 'BW10', text: 'Any other brands worth monitoring not covered above.', type: 'tags', hint: '' },
    ]
  },
  {
    id: 'competitors', title: 'Competitor Watchlist',
    sub: 'Her actual competitive set. Powers Displacement Alerts and the Wednesday Cast view.',
    layer: 'Tracker Configuration',
    questions: [
      { id: 'CW01', text: 'Who is directly competing with Joy for the same roles right now?', type: 'tags', hint: "The people her team knows are going out for the same material." },
      { id: 'CW02', text: 'Closest peers at the same career stage.', type: 'tags', hint: '' },
      { id: 'CW03', text: "Actresses one tier above her she's watching as a model.", type: 'tags', hint: '' },
      { id: 'CW04', text: 'Anyone who has recently booked a role her team had in play.', type: 'tags', hint: '' },
      { id: 'CW05', text: 'Competitors whose brand deals create openings she should move on.', type: 'tags', hint: 'e.g. if a competitor locks a beauty exclusive, that brand\'s rival is now available.' },
      { id: 'CW06', text: 'Emerging actresses entering her competitive space.', type: 'tags', hint: '' },
      { id: 'CW07', text: 'Competitors with audience overlap in her demographic.', type: 'tags', hint: '' },
      { id: 'CW08', text: 'Any other names that belong on the competitor radar.', type: 'tags', hint: '' },
      { id: 'CW09', text: 'Competitors whose press wins or award attention her team is tracking?', type: 'text', hint: '' },
      { id: 'CW10', text: 'Any strategic competitor moves recently that her team is responding to?', type: 'text', hint: '' },
    ]
  },
  {
    id: 'categories', title: 'Category & Topic Watchlist',
    sub: 'The genres, themes, studios, deal types, and topics COMMANDIO monitors on her behalf every day.',
    layer: 'Tracker Configuration',
    questions: [
      { id: 'CT01', text: 'Genres to monitor for casting opportunities.', type: 'multi', options: ['Psychological thriller', 'Prestige drama', 'Horror', 'Dark comedy', 'Sci-fi', 'Period drama', 'Action thriller', 'Crime drama', 'Legal drama', 'Medical drama', 'Anthology', 'Limited series', 'True crime', 'Romantic drama'] },
      { id: 'CT02', text: 'Studios to track most closely.', type: 'multi', options: ['HBO / Max', 'Netflix', 'Apple TV+', 'Amazon / MGM', 'FX', 'Hulu', 'A24', 'Searchlight', 'Universal', 'Warner Bros', 'Sony Pictures', 'Paramount', 'Disney', 'Lionsgate', 'Blumhouse', 'Plan B'] },
      { id: 'CT03', text: 'Deal types to flag immediately when they appear in the trades.', type: 'multi', options: ['First-look deals', 'Blind deals', 'Limited series orders', 'Feature greenlights', 'Pilot orders', 'Series renewals', 'Series cancellations', 'Talent overall deals', 'Production company launches', 'Studio leadership changes'] },
      { id: 'CT04', text: 'Award cycles to monitor for timing signals.', type: 'multi', options: ['Emmy — drama', 'Emmy — limited series', 'Oscar — best actress', 'Oscar — supporting actress', 'SAG Awards', 'Golden Globes', 'BAFTA', 'Critics Choice', 'Film Independent Spirit Awards'] },
      { id: 'CT05', text: 'Brand and fashion calendar moments to track.', type: 'multi', options: ['NYFW', 'Paris Fashion Week', 'Milan Fashion Week', 'Met Gala', 'Cannes red carpet', 'Oscars red carpet', 'Emmys red carpet', 'Coachella', 'Golden Globes red carpet', 'CFDA Awards'] },
      { id: 'CT06', text: 'Brand deal categories that should trigger an immediate alert.', type: 'multi', options: ['Any beauty ambassador deal', 'Any luxury fashion deal', 'Any streaming platform deal', 'Any tech brand deal', 'Any wellness brand deal', 'Any jewelry deal', 'Any footwear deal', 'Any retail collab'] },
      { id: 'CT07', text: 'Industry trends her team is watching that should be part of the feed.', type: 'text', hint: 'e.g. the prestige horror moment, international co-productions, the limited series comeback, etc.' },
      { id: 'CT08', text: 'Specific recurring events or release windows that anchor her timing intelligence.', type: 'text', hint: 'Sundance, upfronts, pilot season windows, etc.' },
      { id: 'CT09', text: 'Any other topics or signals COMMANDIO should watch for Joy not covered above.', type: 'text', hint: '' },
      { id: 'CT10', text: "Is there anything about Joy's career genuinely unique to her situation the system should always factor in?", type: 'text', hint: "Anything that makes her different from a standard Hollywood talent client." },
    ]
  },
]

type Answer = string | string[]
type Answers = Record<string, Answer>

function initAnswers(): Answers {
  const a: Answers = {}
  sections.forEach(s => s.questions.forEach(q => {
    a[q.id] = (q.type === 'multi' || q.type === 'tags') ? [] : ''
  }))
  return a
}

export default function OnboardingForm() {
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initAnswers)
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)

  const total = sections.length
  const section = sections[cur]
  const isLast = cur === total - 1

  function showToast(msg: string, type: string) {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  function setAnswer(id: string, val: Answer) {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  function toggleChip(id: string, val: string) {
    const arr = (answers[id] as string[]) || []
    const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
    setAnswer(id, next)
  }

  function addTag(qid: string) {
    const val = (tagInputs[qid] || '').trim()
    if (!val) return
    const arr = (answers[qid] as string[]) || []
    if (!arr.includes(val)) setAnswer(qid, [...arr, val])
    setTagInputs(prev => ({ ...prev, [qid]: '' }))
  }

  function removeTag(qid: string, val: string) {
    setAnswer(qid, (answers[qid] as string[]).filter(v => v !== val))
  }

  async function saveAll() {
    setSaving(true)
    const allQ = sections.flatMap(s => s.questions)
    const sectionMap: Record<string, typeof sections[0]> = {}
    sections.forEach(s => s.questions.forEach(q => { sectionMap[q.id] = s }))

    const entries = allQ.map(q => {
      const raw = answers[q.id]
      const answerStr = Array.isArray(raw) ? raw.join(', ') : raw || ''
      const s = sectionMap[q.id]
      return { id: q.id, text: q.text, answer: answerStr, section: s.title, layer: s.layer }
    })

    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db: DB, entries })
      })
      const data = await res.json()
      setSaving(false)
      if (res.ok && data.failed === 0) {
        setDone(true)
      } else {
        const errMsg = data.firstError ? JSON.stringify(data.firstError) : 'Check Notion connection.'
        showToast(`${data.saved ?? 0} saved, ${data.failed ?? entries.length} failed. ${errMsg}`, 'err')
      }
    } catch {
      setSaving(false)
      showToast('Save failed. Please try again.', 'err')
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9f9f7; color: #1a1a1a; min-height: 100vh; }
        .page { max-width: 720px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }
        .logo { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: 1rem; }
        h1 { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
        .hsub { font-size: 15px; color: #666; line-height: 1.5; margin-bottom: 1.5rem; }
        .prog-wrap { height: 3px; background: #e8e8e4; border-radius: 2px; margin-bottom: 2rem; }
        .prog { height: 3px; background: #1a1a1a; border-radius: 2px; transition: width .4s ease; }
        .badge { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 1.25rem; }
        .di { background: #e8f0fb; color: #1a4fa0; }
        .tc { background: #ede8fb; color: #4a1a9e; }
        .sec-title { font-size: 20px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
        .sec-sub { font-size: 14px; color: #666; margin-bottom: 2rem; line-height: 1.6; }
        .qblock { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eeeee9; }
        .qblock:last-child { border-bottom: none; }
        .qid { font-size: 10px; font-weight: 600; letter-spacing: .08em; color: #aaa; margin-bottom: 4px; text-transform: uppercase; }
        .qtext { font-size: 15px; font-weight: 500; color: #1a1a1a; margin-bottom: 6px; line-height: 1.5; }
        .qhint { font-size: 12px; color: #999; margin-bottom: 10px; font-style: italic; }
        textarea { width: 100%; min-height: 80px; font-size: 14px; padding: 12px 14px; border-radius: 10px; border: 1.5px solid #e0e0d8; background: #fff; color: #1a1a1a; font-family: inherit; resize: vertical; line-height: 1.6; transition: border .15s; }
        textarea:focus { outline: none; border-color: #1a1a1a; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .chip { padding: 7px 14px; border-radius: 20px; font-size: 13px; cursor: pointer; border: 1.5px solid #e0e0d8; background: #fff; color: #555; transition: all .15s; user-select: none; }
        .chip:hover { border-color: #aaa; }
        .chip.on { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .chip.warn { background: #c0392b; color: #fff; border-color: #c0392b; }
        .toggles { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .tog { padding: 8px 18px; border-radius: 10px; font-size: 14px; cursor: pointer; border: 1.5px solid #e0e0d8; background: #fff; color: #555; transition: all .15s; user-select: none; }
        .tog:hover { border-color: #aaa; }
        .tog.on { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
        .tag-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; min-height: 10px; }
        .tag { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px; background: #f0f0eb; border: 1px solid #e0e0d8; font-size: 13px; color: #1a1a1a; }
        .tag button { background: none; border: none; cursor: pointer; color: #999; font-size: 15px; padding: 0; line-height: 1; }
        .tag button:hover { color: #c0392b; }
        .tag-row { display: flex; gap: 8px; }
        .tag-row input { flex: 1; font-size: 14px; padding: 9px 14px; border-radius: 10px; border: 1.5px solid #e0e0d8; background: #fff; color: #1a1a1a; font-family: inherit; transition: border .15s; }
        .tag-row input:focus { outline: none; border-color: #1a1a1a; }
        .tag-row button { padding: 9px 18px; border-radius: 10px; border: 1.5px solid #e0e0d8; background: #fff; color: #1a1a1a; font-size: 13px; cursor: pointer; font-family: inherit; font-weight: 500; white-space: nowrap; }
        .tag-row button:hover { background: #f0f0eb; }
        .nav { display: flex; align-items: center; justify-content: space-between; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid #eeeee9; }
        .nav-info { font-size: 13px; color: #999; }
        .btn-row { display: flex; gap: 10px; }
        .btn-sec { font-size: 14px; padding: 10px 20px; border-radius: 10px; border: 1.5px solid #e0e0d8; background: #fff; color: #1a1a1a; cursor: pointer; font-family: inherit; font-weight: 500; }
        .btn-sec:hover { background: #f0f0eb; }
        .btn-sec:disabled { opacity: .35; cursor: not-allowed; }
        .btn-pri { font-size: 14px; padding: 10px 22px; border-radius: 10px; border: 1.5px solid #1a1a1a; background: #1a1a1a; color: #fff; cursor: pointer; font-family: inherit; font-weight: 500; }
        .btn-pri:hover { background: #333; border-color: #333; }
        .btn-pri:disabled { opacity: .35; cursor: not-allowed; }
        .toast-wrap { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: #fff; border: 1px solid #e0e0d8; border-radius: 12px; padding: 12px 22px; font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,.1); z-index: 100; white-space: nowrap; }
        .toast-err { border-color: #c0392b; color: #c0392b; }
        .done { text-align: center; padding: 4rem 1rem; }
        .done h2 { font-size: 22px; font-weight: 600; margin-bottom: 10px; }
        .done p { font-size: 15px; color: #666; line-height: 1.6; }
      `}</style>

      <div className="page">
        <div className="logo">COMMANDIO</div>
        <h1>Joy Sunday — Intelligence Onboarding</h1>
        <p className="hsub">For Joy's management team. Answers save directly to Notion.</p>
        <div className="prog-wrap">
          <div className="prog" style={{ width: `${(cur / total) * 100}%` }} />
        </div>

        {done ? (
          <div className="done">
            <h2>Intelligence profile saved.</h2>
            <p>All answers are now live in COMMANDIO's Notion database.<br />The system will begin using this data to personalize Joy's intelligence immediately.</p>
          </div>
        ) : (
          <>
            <span className={`badge ${section.layer === 'Decision Intelligence' ? 'di' : 'tc'}`}>{section.layer}</span>
            <div className="sec-title">{section.title}</div>
            <div className="sec-sub">{section.sub}</div>

            {section.questions.map(q => (
              <div className="qblock" key={q.id}>
                <div className="qid">{q.id}</div>
                <div className="qtext">{q.text}</div>
                {q.hint && <div className="qhint">{q.hint}</div>}

                {q.type === 'text' && (
                  <textarea
                    value={answers[q.id] as string}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    placeholder="Enter answer..."
                  />
                )}

                {q.type === 'toggle' && (
                  <div className="toggles">
                    {q.options!.map(o => (
                      <div
                        key={o}
                        className={`tog${answers[q.id] === o ? ' on' : ''}`}
                        onClick={() => setAnswer(q.id, answers[q.id] === o ? '' : o)}
                      >{o}</div>
                    ))}
                  </div>
                )}

                {q.type === 'multi' && (
                  <div className="chips">
                    {q.options!.map(o => {
                      const on = (answers[q.id] as string[]).includes(o)
                      return (
                        <div
                          key={o}
                          className={`chip${on ? (q.warn ? ' warn' : ' on') : ''}`}
                          onClick={() => toggleChip(q.id, o)}
                        >{o}</div>
                      )
                    })}
                  </div>
                )}

                {q.type === 'tags' && (
                  <>
                    <div className="tag-wrap">
                      {(answers[q.id] as string[]).map(v => (
                        <div className="tag" key={v}>
                          <span>{v}</span>
                          <button onClick={() => removeTag(q.id, v)}>×</button>
                        </div>
                      ))}
                    </div>
                    <div className="tag-row">
                      <input
                        type="text"
                        placeholder="Type and press Enter or Add..."
                        value={tagInputs[q.id] || ''}
                        onChange={e => setTagInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(q.id) } }}
                      />
                      <button onClick={() => addTag(q.id)}>+ Add</button>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="nav">
              <span className="nav-info">Section {cur + 1} of {total}</span>
              <div className="btn-row">
                <button className="btn-sec" disabled={cur === 0} onClick={() => { setCur(c => c - 1); window.scrollTo(0, 0) }}>Back</button>
                {!isLast && <button className="btn-pri" onClick={() => { setCur(c => c + 1); window.scrollTo(0, 0) }}>Next</button>}
                {isLast && <button className="btn-pri" disabled={saving} onClick={saveAll}>{saving ? 'Saving to Notion...' : 'Save to Notion'}</button>}
              </div>
            </div>
          </>
        )}
      </div>

      {toast && (
        <div className={`toast-wrap${toast.type === 'err' ? ' toast-err' : ''}`}>{toast.msg}</div>
      )}
    </>
  )
}
