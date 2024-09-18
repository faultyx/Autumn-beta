process.title = "Autumn beta";

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const auth = require('./auth/secrets.json'); // token & IDs
const prefix = require('./auth/conf.json'); // default prefix

if (prefix.length === 0) {
    console.log('Enter a prefix in the conf.json');
} // Make sure a default prefix is entered in conf.json as it is blank for you

// Testing Intents with Single Intent
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Testing with Discord.js Sample Event Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(auth.token) // Make sure to fill in the secrets.json with your token and IDs
// Never share your token with anyone.
.catch(console.error);