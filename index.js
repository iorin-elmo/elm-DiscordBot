const Discord = require('discord.js')
const client = new Discord.Client()
const { Elm } = require("./elm.js")
const app = Elm.Main.init()


client.on('ready', function (){
  app.ports.ready();
});

client.on('message', async msg => {
  app.ports.message(msg.channel, msg.content);
});

app.ports.send.subscribe( function (ch, str) {
  ch.send(str);
});

app.ports.print.subscribe( function (str) {
  console.log(str);
});

client.login('')
