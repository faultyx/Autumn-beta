process.title = "Autumn beta";

const { Client, Events, GatewayIntentBits } = require('discord.js');

const auth = require("./auth/secrets.json");
const prefix = require("./auth/conf.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(auth.token)
.catch(console.error);