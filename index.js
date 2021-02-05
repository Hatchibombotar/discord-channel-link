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
	console.log(message.channel.id)
	console.log(message.webhookID)
	if (
		message.channel.id == channelid_server1 &&
		message.webhookID == null
	) {
		server2Webhook.send(message.content, { username: message.author.username, avatarURL: message.author.avatarURL({ dynamic: true }) })
		console.log("message in server 1 to server 2")
		return
	}
	if (
		message.channel.id == channelid_server2 &&
		message.webhookID == null
	) {

		server1Webhook.send(message.content, { username: message.author.username, avatarURL: message.author.avatarURL({ dynamic: true }) })
		console.log("message in server 2 to server 1")
		return
	}
})