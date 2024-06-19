import express from 'express'
import { booking, run } from './EmailService'
import cron from 'node-cron'


const app = express()

cron.schedule('*/10* * * * *', async () => {
    await run()
    await booking()
})
app.listen(6000, () => {
    console.log("Background...........")
})

