require('../config')
require('./core')
require('./auth')
require('./action')

// const telegraf = require('telegraf')

// const Stage = require('telegraf/stage')
// const session = require('telegraf/session')
// const Scene = require('telegraf/scenes/base')
// const { keyboard1, backHome } = require('./lib/keyboard')

// const { leave } = Stage
// const stage = new Stage()
// const bot = new telegraf(process.env.BOT_TOKEN)


// const getAuthLanguage = new Scene('getAuthLanguage')
// stage.register(getAuthLanguage)

// const getAuthPhoneNumber = new Scene('getAuthPhoneNumber')
// stage.register(getAuthPhoneNumber)

// const getFirstName = new Scene('getFirstName')
// stage.register(getFirstName)

// const getLastName = new Scene('getLastName')
// stage.register(getLastName)

// const getBirtDate = new Scene('getBirtDate')
// stage.register(getBirtDate)


// const authSendBaza = new Scene('authSendBaza')
// stage.register(authSendBaza)

// // Botga olib kirish uchun
// const mainStart = new Scene('mainStart')
// stage.register(mainStart)

// bot.use(session())
// bot.use(stage.middleware())

// //database conectend
// const readJson = require('./lib/readJson.js')

// //bot start
// bot.start(async (ctx, next) => {
//     const chat_id = ctx.chat.id
//     let users = readJson.select('users')
//     let found = users.find(user => user.telegram_id == chat_id)
//     if (!found) {
//         await ctx.scene.enter('getAuthLanguage')
//         return ctx.reply(
//             'Iltimos bot tilini tanlang!',
//             keyboard1[0]
//         )
//     } else {
//         await ctx.scene.enter('mainStart')
//         return ctx.reply('Assalomu alaykum Uberuz botga xush kelibsiz!\n\nIltmos tilni tanlang!', keyboard1[0])
//     }
// })

// // bita yurib start bosilsa
// getAuthLanguage.command('start', async (ctx) => {
//     ctx.reply(
//         'Keling, yana boshlaylik.\n\nIltimos bot tilini tanlang!',
//         keyboard1[0]
//     )
//     await ctx.scene.leave('getAuthPhoneNumber')
//     ctx.scene.enter('getAuthLanguage')
// })

// // auth uchun till tanlash bosqichi
// getAuthLanguage.on('text', async (ctx) => {
//     if (ctx.message.text === '🇺🇿 Uzbek') {
//         ctx.session.authLang = ctx.message.text
//         ctx.reply("Kantakt yuborish tugmasin bosing 👇", {
//             reply_markup: {
//                 resize_keyboard: true,
//                 keyboard: [[{ text: "📲 Conctact", request_contact: true, },], ['↩️ Orqaga', '🏠 Bosh sahifa']],
//                 one_time_keyboard: true,
//             },
//         })

//     } else if ((ctx.message.text === '🇳🇱 Russian')) {
//         ctx.session.name = ctx.message.text
//     } else if ((ctx.message.text === '🇺🇸 English')) {
//         ctx.session.name = ctx.message.text
//     }
//     await ctx.scene.leave('getAuthLanguage')
//     return ctx.scene.enter('getAuthPhoneNumber')
// })

// // contact yuborishdan turib orqaga qaytish
// getAuthPhoneNumber.hears('↩️ Orqaga', async (ctx) => {
//     ctx.reply(
//         'Keling, boshidan boshlaymiz\n\nIltimos bot tilini tanlang!',
//         keyboard1[0]
//     )
//     await ctx.scene.leave('getAuthPhoneNumber')
//     return ctx.scene.enter('getAuthLanguage')
// })

// getAuthPhoneNumber.hears('🏠 Bosh sahifa', async (ctx) => {
//     ctx.reply(
//         'Keling, boshidan boshlaymiz\n\nIltimos bot tilini tanlang!',
//         keyboard1[0]
//     )
//     await ctx.scene.leave('getAuthPhoneNumber')
//     return ctx.scene.enter('getAuthLanguage')
// })

// getAuthPhoneNumber.on('contact', async (ctx) => {
//     ctx.session.authContact = ctx.message.contact.phone_number
//     ctx.reply('Iltimos ismingizni kiring', backHome[0])
//     await ctx.scene.leave('getAuthPhoneNumber')
//     return ctx.scene.enter('getFirstName')
// })

// // ismdan orqaga qaytish
// getFirstName.hears('↩️ Orqaga', async (ctx) => {
//     ctx.reply("Kantakt yuborish tugmasin bosing 👇", {
//         reply_markup: {
//             resize_keyboard: true,
//             keyboard: [[{ text: "📲 Conctact", request_contact: true, },], ['↩️ Orqaga', '🏠 Bosh sahifa']],
//             one_time_keyboard: true,
//         },
//     })
//     await ctx.scene.leave('getFirstName')
//     return ctx.scene.enter('getAuthPhoneNumber')
// })

// //ismni qabul qilish
// getFirstName.on('text', async (ctx) => {
//     ctx.session.firstname = ctx.message.text
//     ctx.reply('Iltimos Familyangizni kiring', backHome[0])
//     await ctx.scene.leave('getFirstName')
//     return ctx.scene.enter('getLastName')
// })

// // familya orqaga qaytish
// getLastName.hears('↩️ Orqaga', async (ctx) => {
//     ctx.reply('Iltimos ismingizni kiring', backHome[0])
//     await ctx.scene.leave('getLastName')
//     return ctx.scene.enter('getFirstName')
// })

// //familya qabul qilish
// getLastName.on('text', async (ctx) => {
//     ctx.session.lastname = ctx.message.text
//     ctx.reply('Tugulgan yil-oy-sana kiriting!', backHome[0])
//     await ctx.scene.leave('getLastName')
//     return ctx.scene.enter('getBirtDate')
// })

// //sanadan ortga qaytish
// getBirtDate.hears('↩️ Orqaga', async (ctx) => {
//     ctx.reply('Iltimos Familyangizni kiring', backHome[0])
//     await ctx.scene.leave('getBirtDate')
//     return ctx.scene.enter('getLastName')
// })

// //sanaga javob berish
// getBirtDate.on('text', async (ctx) => {
//     ctx.session.birtDate = ctx.message.text
//     // ctx.reply("✅ Rahmat! Sizning malumot qabul qilindi. Biz sizni ro'yhatga oldik",keyboard1[0])
//     ctx.reply("Siz o'z malumotlaringiz to'g'ri ekanligiga ishonch hosil qildingizmi?",
//         { reply_markup: { keyboard: [['️✅ Yaxshi'], ['↩️ Orqaga', '❌ Hammasini oʻchirib tashlang']], resize_keyboard: true, one_time_keyboard: true }, parse_mode: 'markdown' }
//     )
//     await ctx.scene.leave('getBirtDate')
//     return ctx.scene.enter('authSendBaza')
// })


// authSendBaza.hears('↩️ Orqaga', async (ctx) => {
//     ctx.reply('Tugulgan yil-oy-sana kiriting!', backHome[0])
//     console.log(ctx.session)
//     await ctx.scene.leave('authSendBaza')
//     return ctx.scene.enter('getBirtDate')
// })

// authSendBaza.hears('❌ Hammasini oʻchirib tashlang', async (ctx) => {
//     ctx.reply(
//         'Harakat bekor qildingiz!!\n\nIltimos bot tilini tanlang!',
//         keyboard1[0]
//     )
//     await ctx.scene.leave('authSendBaza')
//     return ctx.scene.enter('getAuthLanguage')
// })

// authSendBaza.hears('️✅ Yaxshi', async (ctx) => {
//     let users = readJson.select('users')
//     ctx.session.telegram_id = ctx.chat.id
//     users.push(ctx.session)
//     readJson.insert('users', users)
//     ctx.session = null
//     ctx.reply('Uberuz Botga xush kelibsiz!!!!', keyboard1[0])
//     await ctx.scene.leave('authSendBaza')
//     returnctx.scene.enter('mainStart')

// })

// bot.startPolling()


