const Discord = require('discord.js');
const { token, channelid_server1, channelid_server2, webhookurl_server1, webhookurl_server2 } = require('./config.json');

// set up discord client
const client = new Discord.Client()
client.login(token)

// set up webhook
const webhookID_server1 = webhookurl_server1.substr(33, 18)
const webhookToken_server1 = webhookurl_server1.substr(52, 68)
const server1Webhook = new Discord.WebhookClient(webhookID_server1, webhookToken_server1)

// set up webhook
const webhookID_server2 = webhookurl_server2.substr(33, 18)
const webhookToken_server2 = webhookurl_server2.substr(52, 68)
const server2Webhook = new Discord.WebhookClient(webhookID_server2, webhookToken_server2)

// log when bot is running
client.once("ready", () => console.log("bot running"))

// move messages
client.on("message", message => {
	if (message.member.nickname == null) membername = message.author.username
	else membername = message.member.nickname
	if (message.webhookID == null) {
		if (message.channel.id == channelid_server1) {
			if (message.attachments.array().length > 0) {
				const url = getattach()
				function getattach() {
					const attachurl = message.attachments.first().url
					return attachurl
				}
				console.log(url)
				server2Webhook.send(message.content, { username: membername, files: [url], avatarURL: message.author.avatarURL({ dynamic: true }) })
			}
			else {
				server2Webhook.send(message.content, { username: membername, avatarURL: message.author.avatarURL({ dynamic: true }) })
			}
			return
		}
		if (message.channel.id == channelid_server2) {
			if (message.attachments.array().length > 0) {
				const url = getattach()
				function getattach() {
					const attachurl = message.attachments.first().url
					return attachurl
				}
				console.log(url)
				server1Webhook.send(message.content, { username: membername, files: [url], avatarURL: message.author.avatarURL({ dynamic: true }) })
			}
			else {
				server1Webhook.send(message.content, { username: membername, avatarURL: message.author.avatarURL({ dynamic: true }) })
			}
		}
	}
})
