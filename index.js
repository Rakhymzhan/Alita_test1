const TelegramBot = require('node-telegram-bot-api');
const token = '1202033897:AAHglJA6iLKaP6EA4j47tdw_XwQUtF7sqGA';
// Включить опрос сервера. Бот должен обращаться к серверу Telegram, чтобы получать актуальную информацию
// Подробнее: https://core.telegram.org/bots/api#getupdates
const bot = new TelegramBot(token, { polling: true });



bot.onText(/^\/start/, async function (msg, match) {
    console.log(match);
    try{
        const userId = msg.chat.id;
        let text = "Привет, "+ msg.from.first_name +" меня зовут Алита. С сегодняшнего дня я буду твоим другом, который не даст тебе учиться плохо) Я буду постоянно помогать тебе в самом трудном “Начать работать”. Буду стараться постоянно подбадривать тебя, чтобы ты был в тонусе и твое желание учиться не угасало. Жди от меня много задач. Я буду смотреть на их выполнение и говорить тебе твой прогресс.";
        await bot.sendMessage(userId, text).then(async () => {
            bot.sendMessage(userId, 'Это начало твоего пути в программировании вместе со школой Decode, я верю в тебя :)')
        });
        remindingUsers(userId, msg.from.first_name);
    }
    catch (e) {
        console.log(e);
    }

});




// bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
//     var userId = msg.from.id;
//     var text = match[1];
//     var time = match[2];
//
//     notes.push({ 'uid': userId, 'time': time, 'text': text });
//
//     bot.sendMessage(userId, 'ду ду');
// });
//


function remindingUsers(userId, userName) {
    let notes = [
        {
            text:'Доброе утро, ' + userName+ ', самое время распланировать свой день так, чтобы в нем было время для кодинга. И обязательно выполни домашнее задание :)',
            time: '9:0:0'
        },
        {
            text:'Как проходит твой день, ' + userName +'? Ты выполнил первое задание домашней работы? Начни его делать прямо сейчас, я даю тебе на это 40 минут)',
            time: '15:0:0'
        },
        {
            text:'Ну как, у тебя получилось?',
            answer: [
                [{ text: 'Да', callback_data: '2_yes_'+ userId }],
                [{ text: 'Нет', callback_data: '2_no_'+ userId+'' }]
            ],
            yes: 'Я в этом и не сомневалась, ты очень смышленый(ая). Теперь по решай остальные задачи, если возникают трудности и ты не можешь решить одну задачу более 2 часов, то это сигнал задать вопрос преподавателю. И не бойся искать возможные решения в интернете. Хороший программист должен научиться хорошо гуглить ;)',
            no: 'Я уверена что ты старался решить эту задачу) но учиться - это значит уметь спрашивать и задавать вопросы. Напиши в вашу общую группу что у тебя не получается решить первую задачу, отправь туда скрины своих попыток. Так ты наладишь контакт со своими одногруппниками) да и преподаватель, я уверена будет рад тому, что ты стараешься работать и задавать вопросы и обязательно тебе поможет. Главное, не стесняйся)',
            time: '14:48:30'
        },
        {
            text:'Ну, как твои дела? Познаешь суть программирования) Эх и мне бы пройти весь этот путь заново ;) У тебя получилось выполнить больше половины домашнего задания?',
            answer: [
                [{ text: 'Да', callback_data: '3_yes_'+userId+'' }],
                [{ text: 'Нет', callback_data: '3_no_'+userId+'' }],
                [{ text: 'Уже сделал(а) все', callback_data: '3_allCompleted_'+userId+'' }]
            ],
            allCompleted: 'Ты просто умничка 😘 Продолжай в том же духе, а я запишу это у себя, преподаватель проверит выполненные задания и обязательно передаст мне ;)',
            yes: 'Молодееец, постарайся решить оставшиеся задачи, если будет ну слишком прям трудно, напиши в вашу общую группу, уверена что эти задачи были сложными, но вместе вы сможете их решить)',
            no: 'Я уверена что ты старался решить эту задачу) но учиться - это значит уметь спрашивать и задавать вопросы. Напиши в вашу общую группу что у тебя не получается решить первую задачу, отправь туда скрины своих попыток. Так ты наладишь контакт со своими одногруппниками) да и преподаватель, я уверена будет рад тому, что ты стараешься работать и задавать вопросы и обязательно тебе поможет. Главное, не стесняйся)',
            extraNoAnswer: [
                [{ text: 'Начну выполнять скоро', callback_data: '3_extraYes_'+userId+'' }],
                [{ text: 'Я уделил достаточно времени, но мне было сложновато решить их', callback_data: '3_extraNo_'+userId+'' }]
            ],
            extraYes: 'Хорошо, я думаю у тебя получится и ты все успеешь, сжала свои ручки в кулак и болею за тебя 😍',
            extraNo: 'Да, бывает сложновато с этими домашними заданиями, аж голову сводит. Предлагаю написать в общую группу список задач которые у тебя не получилось решить, и скинуть скрины твоих попыток.',
            time: '14:53:30'
        },
        {
            text:'Ты считаешь что сегодня был продуктивный день в твоем развитии программирования?',
            answer: [
                [{ text: 'Да', callback_data: '4_yes_'+userId+'' }],
                [{ text: 'Нет, я сегодня ничего не делал', callback_data: '4_no_'+userId+'' }],
                [{ text: 'Нет, я думал что смогу сделать больше', callback_data: '4_extraNo_'+userId+'' }]

            ],
            yes: 'И я так считаю, ты славно потрудился(ась). Теперь можешь отдохнуть ;) заранее спокойной ночи!',
            no: 'Нет я сегодня ничего не делал - Наверно в этом есть и моя вина 😢буду стараться подбадривать тебя, на новые свершения! Завтра обязательно порешай задачи 🙏 А сейчас лучше отдохни, спокойной ночи 💤',
            extraNo: ' Мне очень нравится твое усердство 😊Ты можешь продолжить решение задач завтра. Пожелаю тебе спокойной ночи в заранее 😊',
            goodNightAnswer: [
                [{text: 'и тебе спокойной ночи!', callback_data: '4_thanks_'+userId+''}]
            ],
            thanks: ' Спасибо 🥰',
            time: '13:58:0'
        }

    ];
        // sending notifications to user according to corresponding time

    setInterval(async function(){
        for (var i = 0; i < notes.length; i++) {
            var curDate = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
            if (notes[i]['time'] === curDate) {
                const text = notes[i].text;
                if(notes[i].answer !=null){
                  var options = {
                      reply_markup: JSON.stringify({
                          inline_keyboard: notes[i].answer,
                          parse_mode: 'Markdown'
                      })
                  };
                  await bot.sendMessage(userId, text, options).then(async () => {

                  });
              }else {
                  await bot.sendMessage(userId, text).then(async () => {

                  });
              }
            }
        }
    }, 1000);

    bot.on('callback_query', async (msg) => {
            try {
                let answer = msg.data.split('_');
                let index = answer[0];
                let button = answer[1];
                const user_Id= answer[2];

                let data = button + "_"+ user_Id;
                console.log(msg.data);
                switch (data) {
                    case 'yes_'+user_Id:
                        if (notes[index].goodNightAnswer != null) {
                            var options = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: notes[index].goodNightAnswer,
                                    parse_mode: 'Markdown',
                                    hide_keyboard: true
                                })
                            };
                            await bot.sendMessage(user_Id, notes[index].yes, options).then(async () => {

                            });
                        } else {
                            await bot.sendMessage(user_Id, notes[index].yes).then(async () => {

                            });
                        }
                        break;
                    case 'no_'+user_Id:
                        if (notes[index].extraNoAnswer != null) {
                            options = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: notes[index].extraNoAnswer,
                                    parse_mode: 'Markdown'
                                })
                            };
                            await bot.sendMessage(user_Id, notes[index].no, options).then(async () => {

                            });

                        } else if (notes[index].goodNightAnswer != null) {
                            options = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: notes[index].goodNightAnswer,
                                    parse_mode: 'Markdown'
                                })
                            };
                            await bot.sendMessage(user_Id, notes[index].no, options).then(async () => {

                            });
                        } else {
                            await bot.sendMessage(user_Id, notes[index].no).then(async () => {

                            });
                        }
                        break;
                    case 'extraYes_'+user_Id:
                        await bot.sendMessage(user_Id, notes[index].extraYes).then(async () => {

                        });
                        break;
                    case 'extraNo_'+user_Id:
                        if (notes[index].goodNightAnswer != null) {
                            options = {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: notes[index].goodNightAnswer,
                                    parse_mode: 'Markdown'
                                })
                            };
                            await bot.sendMessage(user_Id, notes[index].extraNo, options).then(async () => {

                            });
                        } else {
                            await bot.sendMessage(user_Id, notes[index].extraNo).then(async () => {

                            });
                        }
                        break;
                    case 'thanks_'+user_Id:
                        await bot.sendMessage(user_Id, notes[index].thanks).then(async () => {

                        });
                        break;
                    case 'allCompleted_'+user_Id:
                        await bot.sendMessage(user_Id, notes[index].allCompleted).then(async () => {

                        });
                        break;
                }
            }catch (e) {
                console.log(e.message);
            }
    });

}