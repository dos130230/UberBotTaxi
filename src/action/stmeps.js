const { keyboard2, keyboard3, keyboard1, keyboard4, keyboard5, keyboard6, backHome } = require('../lib/keyboard')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const { textMessage } = require('../lib/messages.js')

// bosh sahifa
const stemp1 = {
    uz: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'Uberuz Telegram botiga xush kelibsiz!\n\nKerakli tilni tanlang! 👇', keyboard1[0])
    },
    ru: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'Добро пожаловать в Telegram-бот Uberuz! \n\nВыберите нужный язык! 👇', keyboard1[0])
    }
}

// Viloyatlarin beardi
const stemp2 = {
    uz: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'Siz qaysi viloyatda turibsiz?\n\nViloyatlardan birini tanlang 👇!', keyboard2[0])
    },
    ru: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'В каком регионе вы живете? \n\n Выберите один из регионов 👇!', keyboard2[1])
    },
}

// Tumani beradi
const stemp3 = {
    uz: (chat_id, msg, information) => {
        return msg.telegram.sendMessage(chat_id, 'Siz qaysi tumanda turibsiz?\n\nTumanlardan birini tanlang 👇', keyboard3(information?.cities?.id, 'name_uz'))
    },
    ru: (chat_id, msg, information) => {
        return msg.telegram.sendMessage(chat_id, 'В каком районе вы живете?\n\nВыберите один из районов 👇', keyboard3(information?.cities?.id, 'name_ru'))
    }

}

// location kiritish
const stemp4 = {
    uz: (chat_id, msg) => {
        return msg.reply("Shafyor sizbilan bog'lanishi uchun telefon raqam kiriting!\n\nTugmadalardan birini tanlang 👇", Extra.markup((markup) => {
            return markup.resize()
                .keyboard([[
                    markup.locationRequestButton('📍 Location yuborish')
                ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
        }))
    },
    ru: (chat_id, msg) => {
        return msg.reply("Введите номер телефона, чтобы Шафёр свяжется с вами!\n\nnВыберите одну из кнопок 👇", Extra.markup((markup) => {
            return markup.resize()
                .keyboard([[
                    markup.locationRequestButton('📍 Отправить местоположение')
                ], ['↩️ Назад', '🏠 Главная']])
        }))
    }
}

// contact kiritish
const stemp5 = {
    uz: (chat_id, msg) => {
        return msg.reply("📞 Telefon raqam yuborish tugmasini bosing yoki boshqa ishlab turgan raqamingizni quyidagi ko'rinishda yozing!\n\nKo'rsatma 👉 +998901234567", Extra.markup((markup) => {
            return markup.resize()
                .keyboard([[
                    markup.contactRequestButton('📞 Contact yuborish'),
                    "📞 Qo'shimcha Contact"
                ], ['↩️ Orqaga', '🏠 Bosh sahifa']])
        }))
    },
    ru: (chat_id, msg) => {
        return msg.reply("📞 Нажмите кнопку Отправить номер телефона или введите свой другой активный номер в форму ниже!\n\nИнструкции 👉 +998901234567", Extra.markup((markup) => {
            return markup.resize()
                .keyboard([[
                    markup.contactRequestButton('📞 Отправить контакт'),
                    "📞 Дополнительный контакт"
                ], ['↩️ Назад', '🏠 Главная']])
        }))
    }
}

const doubleContactStemp = {
    uz: (chat_id, msg) => {
        return msg.reply("📞 Iltimos ishlab turgan telefon raqamni kiring!!\n\nKo'rsatma 👉 998901234567", backHome[0])
    },
    ru: (chat_id, msg) => {
        return msg.reply("📞Пожалуйста, введите рабочий номер телефона!!\n\nИнструкция 👉 998901234567", backHome[1])
    }
}


const stemp6 = {
    uz: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'Nechi kishi ketasiz?\n\n(Maksimal 4 ta tanlash mumkin)', keyboard4[0])
    },
    ru: (chat_id, msg) => {
        return msg.telegram.sendMessage(chat_id, 'Сколько человек вы уходите?\n\n(максимум 4 варианта)', keyboard4[1])
    }

}

const stemp7 = {
    uz: async (msg, language) => {
        let chat_id = msg.chat.id
        await msg.reply("Bizda bor bor bo'lgan tariflar\n\nYuqoridagi tugmalarni tanlang ", backHome[0])
        await msg.telegram.sendMessage(chat_id, textMessage.definition_fast, keyboard6[language]['fast'])
        await msg.telegram.sendMessage(chat_id, textMessage.definition_standart, keyboard6[language]['standart'])
        return
    },
    ru: async (msg, language) => {
        let chat_id = msg.chat.id
        await msg.telegram.sendMessage(chat_id, textMessage.definition_fast, keyboard6[language]['fast'])
        await msg.telegram.sendMessage(chat_id, textMessage.definition_standart, keyboard6[language]["standart"])
        await msg.reply("Тарифы у нас\n\nНажимайте кнопки выше 👆", backHome[1])
        return
    }
}


const stemp8 = {
    uz: (msg) => {
        return msg.reply('🔎 Iltimos kuting Haydovchi topilsa sizga habar beramiz!! 🔎', keyboard5[msg.session.botLang])
    },
    ru: (msg) => {
        return msg.reply('🔎 Пожалуйста, подождите некоторое время, мы сообщим вам, если драйвер найден !! 🔎', keyboard5[msg.session.botLang])
    }
}

// const stemp9 = {
//     uz: (msg) => {
//         return msg.telegram.sendMessage(chat_id, JSON.stringify(information))
//     },
//     ru: (msg) => {
//         return msg.telegram.sendMessage(chat_id, JSON.stringify(information))
//     }
// }

module.exports = {
    stemp1,
    stemp2,
    stemp3,
    stemp4,
    stemp5,
    stemp6,
    stemp7,
    stemp8,
    backHome,
    doubleContactStemp
}