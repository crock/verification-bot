# Simple Discord Verification Bot

Originally created for the Domaincord Discord server.

https://discord.gg/R6wTYQ9

## Usage
I'm assuming you already know how to get a bot token and add the bot to your server.

1. Rename the `.env.example` file to `.env` and fill in the appropriate values.
2. Edit the files `intro-message.md`, `community-guidelines.md`, and `verification-message.md` to add your own server rules and custom verification message. Do not change the filenames.
3. Duplicate the `.env.example` file and rename it to `.env`. Fill in all of the values.
4. Create a channel called #verification in your server and make sure that the bot has permission to READ MESSAGES, SEND MESSAGES, and REACT TO MESSAGES.
5. Run `npm install`
6. Run `npm start` or use a process manager like [pm2](https://pm2.keymetrics.io/) to keep the bot running across server restarts and automatically restart the bot if it crashes.
7. **As the guild owner**, run the command `[prefix]svm` in the #verification channel and delete previous bot messages if there are any.

_Note:_ 
- If you want to change the name of the verification channel, you need to change the value on lines 72 and 92.

## Command Output
![screenshot of command output](https://i.imgur.com/WtcdYsM.png)
