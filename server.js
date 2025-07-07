const path = require("path");
const fastify = require("fastify")({ logger: false });
const fs = require("fs");
const fetch = require('node-fetch'); // لازم تثبته في package.json
// ADD FAVORITES OBJECT VARIABLE HERE
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let favorites = {};

// Load favorites data from file if it exists
const favoritesFilePath = path.join(__dirname, "favorites.json");

// Ensure the file exists, if not, create it with an empty object
if (fs.existsSync(favoritesFilePath)) {
  try {
    const data = fs.readFileSync(favoritesFilePath, "utf8");
    favorites = JSON.parse(data);
  } catch (error) {
    console.error("Error reading favorites file:", error);
    favorites = {}; // In case of error, reset to empty object
  }
} else {
  // If the file doesn't exist, create it with an empty object
  try {
    fs.writeFileSync(favoritesFilePath, JSON.stringify(favorites, null, 2));
  } catch (error) {
    console.error("Error creating favorites file:", error);
  }
}

// Setup static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// Parse incoming form data
fastify.register(require("@fastify/formbody"));

// View templating
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// Home page route
fastify.get("/", function (request, reply) {
  let params = { seo: seo };
  return reply.view("/src/index.html", params);
});

// GET route to retrieve stored favorites
fastify.get("/favorites", function (request, reply) {
  reply.send({ favorites });
});

// POST route to accept the new structured data
fastify.post("/favorites", function (request, reply) {
  console.log("Received POST request:", request.body); // Log received JSON
  
  
  const token = process.env.tk; 
  const chatId = process.env.ch;
  const sh = process.env.salah;
  const message = request.body
  if (request.body.kxz === process.env["sercretkey"]){
    const filePath = path.join(__dirname, "src/index.html");
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('خطأ في قراءة الملف:', err);
        return;
      }
      const lines = data.split('\n');
      var a53 = 0
      var ss = ""
      var theavl = 0
      const mode = request.body.modes
      lines.forEach(line => {
          a53 = a53 + 1
          if (a53 === 7 ){
            const matcherer = line.match(/\.(\d+)/);
            const numbererer = matcherer[1];
            theavl = Number(numbererer) + 1 + 7
            if (mode === "add"){ ss = ss + "KEY." + String(Number(numbererer) + 1) + "\n"}
            if (mode === "delete") {ss = ss + "KEY." + String(Number(numbererer)-1) + "\n"}
          }
          if (mode === "delete" & a53 !=7 & a53 != Number(request.body.vals) + 7){
            ss = ss + line + "\n"
          }
          if ( a53 != 7  & a53 != theavl & mode === "add" ){ss = ss + line + "\n";}
          if (a53 === theavl & mode === "add"){ss = ss +  request.body.vals + "\n" + line + "\n"}
          });
      fs.writeFile(filePath, ss, (err) => {
});
    });
  }

  var t1 = false;
  var t2 = false;
  var t3 = 0;
  const zzz = Number(process.env.zzz);
  if (request.body.ck === 'true'){
     for (let i = 1; i <= Number(zzz); i++) {
         let n2 = "key" + String(i);
         let s2 = process.env[n2];
         if (request.body.ky === s2){
           return reply.send("true")
         } 
     }
  }
  for (let i = 1; i <= Number(zzz); i++) {
    let n1 = "mac" + String(i);
    let n2 = "key" + String(i);
    let s1 = process.env[n1];
    let s2 = process.env[n2];
    if (s1 === request.body.mac) {
      t1 = true;
    };
    if (s2 === request.body.key) {
      t2 = true;
      t3 = i;
    };
    
  }
  if (t1 === true && t2 === true) {
    const response1 = fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    })
    if (t3 == 1){
return reply.send(
  process.env["first" + (t3)] +
  process.env["first" + (t3 + 1)] +
  process.env["first" + (t3 + 2)] +
  process.env["first" + (t3 + 3)] +
  process.env["first" + (t3 + 4)]
);

    }
    if (t3 != 1){
return reply.send(
  process.env["first" + (t3 * 5 -4) ] +
  process.env["first" + (t3 * 5 - 3) ] +
  process.env["first" + (t3 * 5 - 2)] +
  process.env["first" + (t3 * 5 - 1)] +
  process.env["first" + (t3 * 5)]
);
    }
    const data = response1.json();
    reply.json(data);
  }
  

  if (message.startsWith("nms_") === true){
      const response1 = fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: sh,
        text: message
      })
    })
    const data = response1.json();
    reply.json(data);
  };
  if (message.startsWith("L_")) {
      const response =  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    })

    const data = response.json();
    reply.json(data);
  };
  // Save updated favorites list to file
  try {
    fs.writeFileSync(favoritesFilePath, JSON.stringify(favorites, null, 2));
    console.log("Updated Favorites List:", favorites); // Log updated list
  } catch (error) {
    console.error("Error saving favorites file:", error);
    return; // Do not send any response in case of error
  }

  // Do not reply back to the sender
  // reply.send({ status: "success", favorites }); // Removed this line
});

// Start the server
fastify.listen(
  { port: process.env.PORT || 3000, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
