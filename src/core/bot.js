const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)



bot.startPolling()

module.exports = {
    bot
}
