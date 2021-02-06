const Discord = require('discord.js')
const client = new Discord.Client()
const { Elm } = require("./elm.js")
const app = Elm.Main.init()


client.on('ready', function (){
  app.ports.ready();
});


var channel;
client.on('message', async msg => {
  channel = msg.channel;
  app.ports.message(msg.content);
});

app.ports.send.subscribe( function (str) {
  channel.send(str);
});

app.ports.print.subscribe( function (str) {
  console.log(str);
});

client.login('NzQxNDY1MTgxNzIwNDEyMjUw.Xy39Qw.sZbvlReYGEKyJ_gSERwYoowKy1o')
