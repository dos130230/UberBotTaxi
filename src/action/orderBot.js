const { mainStart, session, leave, stage } = require("../auth/language");
const { keyboard6, keyboard5 } = require('../lib/keyboard')
const { stemp1, stemp2, stemp3, stemp4, stemp5, stemp6, stemp7, stemp8, backHome, doubleContactStemp } = require('./stmeps')
const { textMessage } = require('../lib/messages.js')
const Scene = require('telegraf/scenes/base');
const readJson = require("../lib/readJson");
const { bot } = require("../core/bot");

const cities = readJson.select('cities')
const districts = readJson.select('districts')


const getCities = new Scene('getCities')
stage.register(getCities)

const getDistricts = new Scene('getDistricts')
stage.register(getDistricts)

const getLocation = new Scene('getLocation')
stage.register(getLocation)

const getOrderContact = new Scene('getOrderContact')
stage.register(getOrderContact)

const getOrderDoubleContact = new Scene('getOrderDoubleContact')
stage.register(getOrderDoubleContact)

const getOrderCount = new Scene('getOrderCount')
stage.register(getOrderCount)

const getDefinition = new Scene('getDefinition')
stage.register(getDefinition)

const getWaiting = new Scene('getWaiting')
stage.register(getWaiting)

const canselOrder = new Scene('canselOrder')
stage.register(canselOrder)

// auth uchun till tanlash bosqichi
mainStart.on('text', async (ctx) => {
    if (ctx.message.text === '🇺🇿 Uzbek') {
        ctx.session = null
        ctx.session.botLang = 'uz'
        ctx.session.telegram_id = ctx.chat.id
        stemp2[ctx.session.botLang](ctx.chat.id, ctx)
    } else if ((ctx.message.text === '🇳🇱 Russian')) {
        ctx.session = null
        ctx.session.botLang = 'ru'
        ctx.session.telegram_id = ctx.chat.id
        stemp2[ctx.session.botLang](ctx.chat.id, ctx)
    } else if ((ctx.message.text === '🇺🇸 English')) {
        ctx.session = null
        ctx.session.botLang = 'en'
        ctx.session.telegram_id = ctx.chat.id
        stemp2[ctx.session.botLang](ctx.chat.id, ctx)
    }
    await ctx.scene.leave('mainStart')
    return ctx.scene.enter('getCities')
})

getCities.start(async (ctx) => {
    return stemp2[ctx.session.botLang](ctx.chat.id, ctx)
    // await ctx.scene.leave('getCities')
    // return ctx.scene.enter('mainStart')
})

getCities.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getCities')
    return ctx.scene.enter('mainStart')
})


getCities.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getCities')
    return ctx.scene.enter('mainStart')
})

getCities.on('text', async (ctx) => {
    let foundCities = cities.find(cit => cit['name_' + ctx.session.botLang] == ctx.message.text)
    if (!foundCities) return ctx.reply('Bor maluomotari kiring!')

    ctx.session.cities = foundCities
    stemp3[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)

    await ctx.scene.leave('getCities')
    return ctx.scene.enter('getDistricts')
})

getDistricts.start(async (ctx) => {
    return stemp3[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
})

getDistricts.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp2[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getDistricts')
    return ctx.scene.enter('getCities')
})

getDistricts.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getDistricts')
    return ctx.scene.enter('mainStart')
})

getDistricts.on('text', async (ctx) => {
    let foundDist = districts.find(dis => dis['name_' + ctx.session.botLang] == ctx.message.text)
    if (!foundDist) return ctx.reply('Bor maluomotarni kiring!')

    ctx.session.districts = foundDist
    stemp4[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getDistricts')
    return ctx.scene.enter('getLocation')
})


getLocation.start(async (ctx) => {
    return stemp4[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)

})

getLocation.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp3[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getLocation')
    return ctx.scene.enter('getDistricts')
})

getLocation.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getLocation')
    return ctx.scene.enter('mainStart')
})

getLocation.on('location', async (ctx) => {
    ctx.session.location = ctx.message.location
    stemp5[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getLocation')
    return ctx.scene.enter('getOrderContact')
})

getOrderContact.start((ctx) => {
    return stemp5[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)

})

getOrderContact.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp4[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderContact')
    return ctx.scene.enter('getLocation')
})

getOrderContact.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getOrderContact')
    return ctx.scene.enter('mainStart')
})

getOrderContact.on('contact', async (ctx) => {
    ctx.session.orderContact = ctx.message.contact.phone_number
    stemp6[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderContact')
    return ctx.scene.enter('getOrderCount')
})

getOrderContact.hears(["📞 Qo'shimcha Contact", "📞 Дополнительный контакт"], async (ctx) => {
    ctx.session.orderContact = ctx.message.contact
    doubleContactStemp[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderContact')
    return ctx.scene.enter('getOrderDoubleContact')
})

getOrderDoubleContact.start((ctx) => {
    return doubleContactStemp[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
})

getOrderDoubleContact.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp4[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderDoubleContact')
    return ctx.scene.enter('getOrderContact')
})

getOrderDoubleContact.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getOrderDoubleContact')
    return ctx.scene.enter('mainStart')
})

getOrderDoubleContact.on('text', async (ctx) => {
    let mes = {
        uz: (ctx) => {
            return ctx.reply("Iltimos to'g'ri raqam kiriting\n\nYuqoridagi ko'rinishda kiriting 👆")
        },
        ru: (ctx) => {
            return ctx.reply("Пожалуйста, введите правильный номер\n\nВведите в представлении выше 👆")
        }
    }
    if (!(/^998(9[012345789]|3[3]|7[1]|8[8])[0-9]{7}$/).test(ctx.message.text)) {
        return mes[ctx.session.botLang](ctx)
    }
    ctx.session.orderContact = ctx.message.text
    stemp6[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderDoubleContact')
    return ctx.scene.enter('getOrderCount')
})


getOrderCount.start((ctx) => {
    return stemp6[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)

})

getOrderCount.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp5[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getOrderCount')
    return ctx.scene.enter('getOrderContact')
})

getOrderCount.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getOrderCount')
    return ctx.scene.enter('mainStart')
})

getOrderCount.hears(['1️⃣', '2️⃣', '3️⃣', '4️⃣', '🔄 Hamma joyni band qilish', '🔄 Занят везде'], async (ctx) => {
    ctx.session.orderCount = ctx.message.text
    stemp7[ctx.session.botLang](ctx, ctx.session.botLang)
    await ctx.scene.leave('getOrderContact')
    return ctx.scene.enter('getDefinition')
})


getDefinition.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back', '/start'], async (ctx) => {
    stemp6[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('getDefinition')
    return ctx.scene.enter('getOrderCount')
})

getDefinition.hears(['🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx)
    await ctx.scene.leave('getDefinition')
    return ctx.scene.enter('mainStart')
})


getDefinition.action('action1', async (ctx, next) => {
    // bu yerda oderni bazaga yuboramiz
    //....
    //....
    //....





    stemp8[ctx.session.botLang](ctx) // clentga kutish sozini yubordi
    await ctx.scene.leave('getDefinition')
    ctx.scene.enter('canselOrder')



    const promise1 = new Promise((resolve, reject) => {
        setTimeout(async () => {
            await ctx.reply(textMessage.definition_result, keyboard6[ctx.session.botLang]['driver'])
            // await ctx.telegram.sendMessage(ctx.chat.id, JSON.stringify(ctx.session))
        }, 5000);
    });

    next()

})

getDefinition.action('action2', async (ctx, next) => {

    setTimeout(async () => {
        await ctx.telegram.sendMessage(ctx.chat.id, textMessage.definition_result, keyboard6[ctx.session.botLang]['driver'])
        // await ctx.telegram.sendMessage(ctx.chat.id, JSON.stringify(ctx.session))
        next()
    }, 10000)
})

getDefinition.action('action3', async (ctx, next) => {
    // console.log(ctx.message)
    await ctx.telegram.sendMessage(ctx.chat.id, textMessage.definition_driver, keyboard5[0])
    next()
})

canselOrder.hears(['❌ Bekor qilish', '❌ Отмена', '🏠 Bosh sahifa', '🏠 Главная', '🏠 Home'], async (ctx) => {
    stemp1[ctx.session.botLang](ctx.chat.id, ctx, ctx.session)
    await ctx.scene.leave('canselOrder')
    ctx.session = null
    return ctx.scene.enter('mainStart')

})

canselOrder.hears(['↩️ Orqaga', '↩️ Назад', '↩️ Back'], async (ctx) => {
    stemp7[ctx.session.botLang](ctx, ctx.session.botLang)
    await ctx.scene.leave('canselOrder')
    return ctx.scene.enter('getDefinition')
})



// {
//     "first_name": "Abdurahmon",
//     "second_name": "Karimov",
//     "birth_date": birthDate.text,
//     "telegramId" :2125760802,
//     "attachments": {
//         "main": {
//             "result":
//                 "https: //upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
//             "preview":
//                 "https: //upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
//         };
//     }
// };