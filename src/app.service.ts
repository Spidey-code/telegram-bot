import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    this.botMessage();
  }

  async botMessage() {
    const token = '5680785767:AAEPLzQhEWlJvL6BEI7X3agcc8I56BhCRE0';

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      console.log(msg);
      const greet = ['hi', 'hii', 'hey'];
      if (greet.includes(msg.text.toString().toLowerCase())) {
        bot.sendMessage(
          msg.from.id,
          'Konnichiwa ' +
            msg.from.first_name +
            `, Are you anime fan? Let's check`,
        );
      }

      const onePiece = 'One piece';
      if (msg.text.indexOf(onePiece) === 0) {
        const data = {
          question: 'Zoro is also called as?',
          options: [
            [
              {
                text: 'Lost pirate',
              },
            ],
            [
              {
                text: 'Bounty hunter',
              },
            ],
            [
              {
                text: '3 swords man',
              },
            ],
            [
              {
                text: 'Onigiri user',
              },
            ],
          ],
          answer: 1,
        };
        bot.sendMessage(
          msg.chat.id,
          `${data.question} \n\n Choose one of the option below`,
          {
            reply_markup: {
              keyboard: data.options,
              resize_keyboard: true,
              remove_keyboard: true,
            },
          },
        );
      }

      const trending = 'Trending';
      if (msg.text.indexOf(trending) === 0) {
        bot.sendMessage(msg.chat.id, 'Coming soon', this.optRemove);
      }
    });

    // commands
    bot.onText(/\/start/, (msg) => {
      bot.sendMessage(msg.chat.id, 'Choose your option to start quiz', {
        reply_markup: {
          keyboard: [['One piece'], ['Trending']],
          resize_keyboard: true,
        },
      });
    });

    // Inline commands
    // bot.onText(/\/end/, async (msg) => {
    //   const data = await bot.sendMessage(msg.chat.id, 'Okay', {
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: 'one',
    //             callback_data: 'sending-one',
    //           },
    //         ],
    //         [
    //           {
    //             text: 'two',
    //             callback_data: 'sending-two',
    //           },
    //         ],
    //       ],
    //       // remove_keyboard: true,
    //     },
    //   });
    //   console.log('data is here', data.reply_markup.inline_keyboard);
    // });
  }
  optRemove = {
    reply_markup: {
      remove_keyboard: true,
    },
  };
}
