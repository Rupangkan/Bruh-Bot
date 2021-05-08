const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")

const client = new Discord.Client()

client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`)
})

//$help to get the bot commands
 async function help(){
    let str = [
      `Hello Bitches and Gentlemen. This is your Bruh Bot. Use me Wisely :`,
      ``,
    // `Bruh use these commands after the $bruh command:`,
    // ``,
    // `Asshole [from] => returns content of the form 'Fuck you, asshole. - [from]'`,
    // ``,
    // `Fuck [name] => returns 'Fuck Fuck - [name]'`,
    // ``,
    `Explore Commands yourself Bih`,
    ``,
    'Enjoy Bruh <3',
    ].join('\n')
    
    return str

}

//Get response from foass api as per users message
async function getReply(arr){
  let strArr = arr.split(" ")
  let url = "https://foaas.com/"
  for(let i = 1; i<strArr.length; i++){
    url = url + strArr[i] + "/"
  }
  const variable = await fetch(url,{
    method : "get",
    headers : {
      // "Content-type" : "application/json;charset=UTF-8",
      "Accept" : "text/plain"
      }
  })
  .then(res => res.text())
  .catch(e => console.log(e.message))
 
  console.log(variable)
  return variable
 
}

//Accepting message from the users
client.on("message", async msg =>{
  if(msg.content === "$help"){
    try{
      let commands = await help()
      msg.channel.send(commands)
    }catch(e){
      console.log(e.message)
    }
  }
  else if(msg.content.includes("$bruh")){
    try{
      let data = await getReply(msg.content)
      console.log(data)
      msg.channel.send(data)
      return
    }catch(error){
      console.log(error.message)
    }
  }
  let message = msg.content.toLowerCase()
  if(msg.author.bot) return
  if(message === "anke nahaba"){
    msg.reply("Anke a haba")
    return
  }
  
})

//Keeps the server alive
keepAlive()
const mySecret = process.env['TOKEN']
client.login(mySecret)
