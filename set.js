const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlBUWmo5NElkQ0FGblo3NXFLQzlBVDloRVVsdHNQQy9Ha3UrdUhLazExVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjUyeS9ZbDJFTnZXOGJYL1kxKzloWE1VaEdLeVZNeXVxR1Z5bkthcFJWWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQXRzZ3N0RXBzNlRkeGtWQWtVVFJkNVU3blpSNndDMS93eExSb2xTTm1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4QUdRN2JWVlB5ZmxydkF6dkZvT1pBQytyTkpkVm93Z0lWVnlNOHhkT0VRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNKUWMzMzdRS1VZNG9CNENOdmFxZ2VacEl5Q095Y2RXcEErWXhKdGwwbU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdGYlliNC92bjY3UGZIK1pIZ2lOMVk0RjZZYi9hNGx6MG1iaFAyK3ZIejA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUVudGdoaFRGU3RSZG8waWRvL2pNNlRUNndndkZCelBHbFBTVlo3UFFXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHpXc0duTFlVSlFFTXBhaUM3aEt5TS9oVWJXMVBhR0hVSVcyMXFzQlBIcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1PZUwyZkNKNnB1Q21xOUpKMi9KbFMzNnRuUjBYMWJnTFIva1ozdmptUEY2OUFaaGNEcjc1QWFKOWgrWTVxMU9nR3piUHBXS0xJOHE1MERjcytJMEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDIsImFkdlNlY3JldEtleSI6Imd0ZG82MndUMHhJVnczVTRxek12Rm1jcTBOZmphVFRXZkMwTWFISjlubk09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlFzcmhuSk9sU3ZDbDVUOVlrZWhPemciLCJwaG9uZUlkIjoiMTAzNDRiZTctZDIxNC00MzdjLTllMzEtMDA0ZjgyMGZkODMyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNNdWNvN25icDZid1ZmWnZDQVJuQ3NzYWMzYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4cTNvR0dLRW5id0kvU3RhelFQYll5OEJSMWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOFZRQ0JCV0MiLCJtZSI6eyJpZCI6IjI1Njc2MTM5NjMwOTo0NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJCzLrNhkHMus2GQsy6zYZZzLrNhkbMus2GWMy6zYYifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0plbnFwQUdFTC9ldnJnR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFrVnRia2x0UjZ3L1BQTVpQTHJVb2dZZDJnOWYyQ2ZZbDE3dDEreU1nUk09IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNWdVlGVlQ0RnI4ODZYL1gwR3ZzWDFlaGdCNDRBNUthUm9WbzhURjMzeHVrK0lxZFJ3VWU4NTZZRmVybW1mY3czYnM3Z2dFSTN1SUc3NGRDUnp3RUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvS1g3b0RPWkc3ZU94S2RnQWRSZFB1elBSSXIyNDZ5M0FJKzdteXBKbzhzR3dob1lweWZpV0JUYkx4VGRNRSs1cUdXS1lxMEk5RkdBNDg4aTFhV2REQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc2MTM5NjMwOTo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVSkZiVzVKYlVlc1B6enpHVHk2MUtJR0hkb1BYOWduMkpkZTdkZnNqSUVUIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MDgxMTY1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5DWCJ9',
    PREFIXE: process.env.PREFIX || "#",
    OWNER_NAME: process.env.OWNER_NAME || "babyfx",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "256761396309", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Favor',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
