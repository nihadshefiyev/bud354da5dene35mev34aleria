const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const fs = require("fs");
const db = require('quick.db')
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
let prefix = ayarlar.prefix

const Hserver = new Discord.WebhookClient("775581158603358208", "woEZTOcMBSAhnI9cyonQG7mDNoHpoMNWU6p1BFc4wHnXr-owuJ6ot4p1YEY61Rj3XiMs") //HOSGELDIN MESAJCISI





const http = require("http");
app.get("/", (request, response) => {//splashen
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {//splashen
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {//splashen
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(process.env.TOKEN);


client.on("ready", () => {//splashen
  client.user.setPresence({
    game: { name: `『AZ』❤️ Az Team`, type: "WATCHING" },
    status: "online"
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.addRole(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.addRole(kayıtsızROL)
})

/// kayıtsız rolü son
//splashen


// TAG LOG
client.on("userUpdate", async (oldUser, newUser) => {//splashen
  if (oldUser.username !== newUser.username) {
    let tag = ayarlar.tag
  
    let rol = ayarlar.tagROL;
    
    
    let embed1 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    if (newUser.username.includes(tag) && !client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(ayarlar.tagLOG).send(embed1)
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).removeRole(rol)
      client.channels.get(ayarlar.tagLOG).send(embed2)
    }

  }
})
// TAG LOG SON
//splashen

// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot)
member.setRoles(['766634491502395392'])
})
// GİRİŞ 
  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.RichEmbed()
  let rol = ayarlar.kayıtsızROL
 member.addRole(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:no1:775272068710662164> __**Bu Kullanıcı Şüpheli**__'
if (tarih > 1296000000) kontrol = '<a:tik3:775272076721651712> __**Bu Kullanıcı Güvenli**__'
  moment.locale("tr");
  let kanal1 = client.channels.get(kanal);
    let giris = new Discord.RichEmbed()
   .setTitle(`<a:kraltac:775272082287099914> | \`Sunucuya Bir Üye Katıldı!\` | <a:kraltac:775272082287099914>`)
    .setDescription(`
• ** __Hoşgeldin! ${member}__ **

•  <a:pembeh:775272069676007444> **__Seninle Birlikte ${member.guild.memberCount} Kişiyiz.__ **

• \`{ ${ayarlar.tag} }\`** __Tagımızı alarak ekibimize katılabilirsin.__ **

• <a:alarm1:775272067968008222> ** <@&${ayarlar.yetkiliROL}> __seninle ilgilenicektir.__ **

• <a:sari3:775272069679808512> ** __Hesabın Oluşturulma Tarihi:__** \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

•  ${kontrol} 

• <a:duyur:775272068710662164> ** __ Ses teyit odasında kaydınızı yaptırabilirsiniz. __ ** 

`)//splashen
    .setThumbnail(member.user.avatarURL || 'https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setImage('https://cdn.discordapp.com/attachments/766342468576608318/766343451994226778/af8039261a387be71514bb4c2e5e54b5.gif')
    .setTimestamp()
kanal1.send(giris)
  });
// GİRİŞ SON
//splashen


//ODA SILME KORUMA ODALARIN SILINMEMESINE YARAR

///kanal sılme koruması
client.on("channelDelete", async channel => {
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
  let member = guild.members.get(logs.entries.first().executor.id);
  if(!member) return;
  channel.clone(channel.name, true, true, "Kanal silme koruması sistemi").then(async klon => {
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})

//WEBHOOK QARABAG AZERBAYCANDIR SA AS KOMUTU


client.on("message" , async message => {

if(message.content==="Sa")

Hserver.send("Aleykum Selam , Hosgeldin <a:luxuryrose:767013464987271258>")
if(message.content != "Sa") return
message.react("767013464987271258")

})


client.on("message" , async message => {

if(message.content==="sa")

Hserver.send("Aleykum Selam , Hosgeldin <a:luxuryrose:767013464987271258>")
if(message.content != "sa") return
message.react("767013464987271258")

})

client.on("message" , async message => {

if(message.content==="sA")

Hserver.send("Aleykum Selam , Hosgeldin <a:luxuryrose:767013464987271258>")
if(message.content != "sA") return
message.react("767013464987271258")

})

client.on("message" , async message => {

if(message.content==="SA")

Hserver.send("Aleykum Selam , Hosgeldin <a:luxuryrose:767013464987271258>")
if(message.content != "SA") return
message.react("767013464987271258")

})


//sese sokma 


client.on('ready', ()=>{
client.channels.get('774936350168317982').join()
})




