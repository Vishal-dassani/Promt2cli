require('dotenv').config()

const cors = require('cors')
const express = require('express')
const commandRoutes = require('./routes/commandRoutes');

const app = express()
const port = Number(process.env.PORT) || 5000
const allowedOrigins = (process.env.CLIENT_URL ||
  'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' }))

console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);
app.use('/api/commands', commandRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Prompt2CLI API is running',
  })
})

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.status && err.status < 500 ? err.message : 'Internal server error',
  })
})

app.listen(port, () => {
  console.log(`Prompt2CLI API listening on http://localhost:${port}`)
})