require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = process.env.PREFIX

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  await client.user.setActivity('Verify in #verification');
})

client.on('message', async msg => {
  if (msg.author.bot) return
  if (msg.content.indexOf(prefix) !== 0) return
  
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)
  
  const command = args
    .shift()
    .toLowerCase()
    .replace('/', '')
  
  // svm = set verification message
  if (command === 'svm') {

    // If sender of message is not the guild owner, cancel action
    if (msg.member.guild.owner.id !== msg.member.id) return
    
    const communityGuidelinesContent = fs.readFileSync('community-guidelines.md', {encoding:'utf8', flag:'r'})
    const verificationMessageContent = fs.readFileSync('verification-message.md', {encoding:'utf8', flag:'r'})
    
    const embed = new Discord.RichEmbed()
      
    embed.addField('🎗 Community Guidelines', communityGuidelinesContent)
    embed.addField('🔐 Getting Verified', verificationMessageContent)
    
    const theVerificationMessage = await msg.channel.send({embed})
    theVerificationMessage.react('720420182538977281')
    
    msg.delete()
  }
})

client.on('messageReactionAdd', async ( { message: { channel } }, user ) => {
    if (/verification/.test(channel.name)) {
        try {
            const member = await channel.guild
                .fetchMember(user)
                
            await member.addRole(process.env.ROLE)
        } catch (error) {
            console.error(error)
        }
    }
})

client.on('messageReactionRemove', async ( { message: { channel } }, user ) => {
    if (/verification/.test(channel.name)) {
        try {
            const member = await channel.guild
                .fetchMember(user)
                
            await member .removeRole(process.env.ROLE)
        } catch (error) {
            console.error(error)
        }
    }
})

client.on('raw', ({ d: data, t: event }) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(event)) {
        const { channel_id, user_id, message_id, emoji } = data

        const channel = client.channels.get(channel_id)

        if (!channel.messages.has(message_id)) channel.fetchMessage(
            message_id
        ).then( message => {
            const reaction = message.reactions.get(
                emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name 
            )

            const user = client.users.get(user_id)

            if (reaction) reaction.users.set(user_id, user)
            
            client.emit( 
                event === 'MESSAGE_REACTION_ADD' 
                    ? 'messageReactionAdd' 
                    : 'messageReactionRemove', 
                reaction, 
                user
            )
        })
    }
})

client.login(process.env.TOKEN)