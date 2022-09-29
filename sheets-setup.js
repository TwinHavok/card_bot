const { google } = require("googleapis");

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
