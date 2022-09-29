// Require the necessary discord.js classes
const { EmbedBuilder, Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { getCards } = require("./get-cards");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("The bot is running");
  client.user.setActivity("Type /draw to draw a card");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  //console.log(interaction);

  if (interaction.commandName === "draw") {
    try {
      await interaction.deferReply();
      let guild = interaction.options.getString("guild");
      let user = interaction.member.nickname;
      let card = await getCards(user, guild);
      await interaction.editReply({ embeds: [card] });
    } catch (err) {
      console.log(err.message);
    }
  }
});

// Login to Discord with your client's token
client.login(token);
