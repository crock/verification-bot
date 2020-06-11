# Simple Discord Verification Bot

Originally created for the [Domaincord Community](https://discord.gg/R6wTYQ9).

## Usage
I'm assuming you already know how to get a bot token and add the bot to your server.

1. Rename the `.env.example` file to `.env` and fill in the appropriate values.
2. Edit the files `community-guidelines.md` and `verification-message.md` to add your own server rules and custom verification message. Do not change the filenames.
3. Run `npm install`
4. Run `npm start` or use a process manager like [pm2](https://pm2.keymetrics.io/) to keep the bot running across server restarts and automatically restart the bot if it crashes.
5. As the guild owner, run the command `!svm` in the channel you want designated as the verification channel. **Make sure the bot has access to send messages, delete messages, and react to messages in this channel!**

## Command Output
![screenshot of command output](https://i.imgur.com/WtcdYsM.png)
