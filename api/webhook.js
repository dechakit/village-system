const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const LINE_TOKEN = process.env.LINE_TOKEN

async function replyMessage(replyToken, text) {
  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LINE_TOKEN}`
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }]
    })
  })
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(200).send('OK')

  const events = req.body.events || []

  for (const event of events) {
    if (event.type !== 'message') continue

    const text = event.message.text?.trim() || ''
    const replyToken = event.replyToken

    if (text === 'สวัสดี') {
      await replyMessage(replyToken, 'สวัสดีครับ ยินดีต้อนรับสู่ระบบหมู่บ้าน Plus City Park 101/1 🏘️')
    } else {
      await replyMessage(replyToken, `รับข้อความว่า: "${text}" ครับ`)
    }
  }

  res.status(200).send('OK')
}
