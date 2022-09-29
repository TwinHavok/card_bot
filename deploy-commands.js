const { REST, SlashCommandBuilder, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("draw")
    .setDescription("Draws a random drama card containing a roleplay prompt.")
    .addStringOption((option) =>
      option
        .setName("guild")
        .setDescription("Input your current guild.")
        .setChoices(
          { name: "Guildless", value: "Guildless" },
          { name: "Hallowed Vanguard", value: "Hallowed Vanguard" },
          { name: "Steadfast", value: "Steadfast" },
          { name: "Neverdawn Network", value: "Neverdawn Network" },
          { name: "Scarlet Feast", value: "Scarlet Feast" },
          { name: "Order of the Morning", value: "Order of the Morning" },
          { name: "Oathbreaker", value: "Oathbreaker" },
          { name: "Unchained", value: "Unchained" }
        )
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
