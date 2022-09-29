const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const { google } = require("googleapis");

const getCards = async (user, guild) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //Auth client Object
  const authClientObject = await auth.getClient();
  //Google sheets instance
  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });

  const spreadsheetId = "1f84Z_TtUTpcjd-pten-gJhrYFJFGL0aDaFVwlMb1vHk";
  //Read front the spreadsheet
  const readData = await googleSheetsInstance.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Drama Cards!A:D", //range of cells to read from.
  });

  //filter with generic and guild values
  const result = await readData.data.values.filter((row) => {
    if (Number(row[0]) > 0) {
      let temp = row[1].toLowerCase();
      if (
        temp == guild.toLowerCase() ||
        temp == "generic" ||
        temp == "all hallows eve" ||
        temp == "yule"
      ) {
        return true;
      }
    }
  });

  //console.log(result);

  //add up the total probability and assign a probability value to a row.
  let tot_chance = 0;
  for (let i = 0; i < result.length; i++) {
    tot_chance += Number(result[i][0]);
    result[i][4] = tot_chance;
  }

  //console.log(tot_chance);
  //console.log(result);

  const cards = [];
  let index = 0;
  while (cards.length < 3) {
    let temp = Math.random() * tot_chance;
    //console.log(temp);
    for (let j = 0; j < result.length; j++) {
      if (temp < result[j][4]) {
        cards[index] = result.splice(j, 1)[0];
        index += 1;
        break;
      }
    }
  }

  //console.log(cards);

  const embedMessage = new EmbedBuilder()
    .setColor(0xffd700)
    .setTitle("Deck of Fate")
    .setAuthor({ name: user })
    .setDescription("You draw three cards from the " + guild + " fate deck.")
    .setTimestamp()
    .setFooter({
      text: "--------------------\nChoose one of the three cards. Roleplay it out from the moment you learn about the situation. Post a summary of your adventure in the #chronicles channel to gain one candy. Feel free to involve your fellow players! See this document for more details and rules: (insert url)",
    });
  for (let i = 0; i < cards.length; i++) {
    //console.log(cards[i]);
    embedMessage.addFields({
      name: cards[i][2] + " (" + cards[i][1] + ")",
      value: cards[i][3],
    });
  }
  return embedMessage;
};

module.exports = {
  getCards,
};
