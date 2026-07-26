require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, ActivityType, Collection } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Load commands dynamically from the commands folder
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`⚠️  Skipping ${file} — missing "data" or "execute" property.`);
  }
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  client.user.setActivity("WMMT 6RR", {
    type: ActivityType.Playing,
  });
});

// Handle slash command interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: "There was an error running this command.", ephemeral: true });
    } else {
      await interaction.reply({ content: "There was an error running this command.", ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);