const express = require("express");
const res = require("express/lib/response");
const { google } = require("googleapis");
const port = process.env.PORT || 8000
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index");
  });
app.post("/",async (req, res) => {
    const { Your_name, Love_name } = req.body;


  const auth =new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "14IohrdC4mxzUNNat8w6C683r5VwINJh37dANcN_v59M";

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
          [Your_name, Love_name]
        ],
    },
  });

});

app.listen(port,()=>{
    console.log(`ruining to the port at ${port}`)
})