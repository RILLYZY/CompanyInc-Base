const fs = require('fs');
const chalk = require('chalk');
const util = require('util');
const axios = require('axios');
const moment = require('moment-timezone');

 // Bot base de WhatsApp cr: RilzX7 Inc. \\
      //  CompanyInc ©Copyright  \\
       // Thx For Using this base \\
const {
  downloadMediaMessage,
  downloadContentFromMessage,
  generateWAMessageFromContent,
  generateWAMessage,
  prepareWAMessageMedia,
  proto,
  jidDecode,
  getContentType,
  delay,
  areJidsSameUser
} = require('@whiskeysockets/baileys')

module.exports = async (sock, m, chatUpdate, store) => {
    try {
        const { type, quotedMsg, mentioned, now, fromMe } = m;
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype === 'imageMessage') ? m.message.imageMessage.caption : (m.mtype === 'videoMessage') ? m.message.videoMessage.caption : (m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype === 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id : '';     
        const Owner = JSON.parse(fs.readFileSync('./CompanyInc/owner.json'))
        const Premium = JSON.parse(fs.readFileSync('./CompanyInc/prem.json'))
        const prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : '';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const text = q = args.join(" ");
        const pushname = m.pushName || "No Name";
        const BotNum = sock.decodeJid(sock.user.id);
        const isOwner = [BotNum, ...Owner]
        const Prem = [BotNum, ...Premium]
        const isGroup = m.chat.endsWith('@g.us');
        const sender = m.sender;
        if (m.message) {
            console.log(chalk.hex("#FF0000").bold(`cr : ⏤ 𝖱𝗂𝗅𝗓𝖷𝟩.𝖨𝗇𝖼`)); 
        	console.log(chalk.hex("#FFD700").bold(`🎭 SUCCESSFULLY CONNECTED 🎭`));
        	console.log(chalk.hex("#1E90FF").bold("┌───────────────────────────────┐"));
        	console.log(chalk.hex("#1E90FF").bold("│      NEW MESSAGE LOG         │"));
        	console.log(chalk.hex("#1E90FF").bold("├───────────────────────────────┤"));
        	console.log(chalk.hex("#FF8C00")(`│ 📅 ${chalk.hex("#FFFFFF")("Date       :")} ${chalk.hex("#DA00FF")(new Date().toLocaleString())}`));
        	console.log(chalk.hex("#00CED1")(`│ 💭 ${chalk.hex("#FFFFFF")("Type       :")} ${chalk.hex("#DA00FF")(m.isGroup ? "GROUP" : "PRIVATE")}`));
        }
        
if (!sock.public) {
if (!isOwner) return
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function reply(text) {
  return sock.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      forwardingScore: 666,
      isForwarded: true
    }
  }, {
    quoted: m
  })
}


switch (command) {
case 'inc': 
case 'menu': {
sock.sendMessage(m.chat, {
    buttonsMessage: {
      locationMessage: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: 'cr : ⏤ 𝖱𝗂𝗅𝗓𝖷𝟩.𝖨𝗇𝖼',
        address: 'CompanyInc.',
        jpegThumbnail: './CompanyInc/menu.jpg'
      },
      contentText: 
`Hola señor ${pushname} 〽️

!! *_Whatsap Inc._* !!
- insp
- self
- public
- addown
- delown
- addprem
- delprem
- > 
- $ 

!! *_Ptcp Support_* !!
- @𝖱𝗂𝗅𝗓𝖷𝟩.𝖨𝗇𝖼
- @CompanyInc ©Copyright 
- @MargaX7
`,   
 footerText: 'CompanyInc @Copyright',
   buttons: [
      {
    buttonId: '.creator',
    buttonText: {
      displayText: 'cr : ⏤ 𝖱𝗂𝗅𝗓𝖷𝟩.𝖨𝗇𝖼'
    },
    type: 1,
  }
],
headerType: 6
    }
  }, {
    quoted: m
  })
  break;
 }
 
case 'creator': { 
reply(`
!! *_Ptcp Support_* !!
- @𝖱𝗂𝗅𝗓𝖷𝟩.𝖨𝗇𝖼
- @CompanyInc ©Copyright 
- @MargaX7

# Contact
t.me/WhatsapInc ( RilzX7 )
t.me/stresser_id
t.me/literxz
t.me/Zetsxxx`)
}
break
 
case 'addowner':
case 'addown': {
if (!isOwner) return reply('Owner Only')
if (!q) return reply(`Example: ${prefix + command} 628xx`)
let nomor = q.replace(/[^0-9]/g, '')
let cek = await sock.onWhatsApp(nomor + '@s.whatsapp.net')
if (!cek.length) return reply('Number Invalid!')
if (Owner.includes(nomor)) return reply('Number already owner')
Owner.push(nomor)
Premium.push(nomor)
fs.writeFileSync('./CompanyInc/owner.json', JSON.stringify(Owner))
fs.writeFileSync('./CompanyInc/prem.json', JSON.stringify(Premium))
reply(`Success add ${nomor} to owner`)
}
break
case 'delowner':
case 'delown': {
if (!isOwner) return reply('Owner Only')
if (!q) return reply(`Example: ${prefix + command} 628xx")
let nomor = q.replace(/[^0-9]/g, '')
if (!Owner.includes(nomor)) return reply('Number not found`)
Owner.splice(Owner.indexOf(nomor), 1)
if (Premium.includes(nomor)) {
    Premium.splice(Premium.indexOf(nomor), 1)
}
fs.writeFileSync('./CompanyInc/owner.json', JSON.stringify(Owner))
fs.writeFileSync('./CompanyInc/prem.json', JSON.stringify(Premium))
reply(`Success delete ${nomor}`)
}
break

case 'addpremium':
case 'addprem': {
if (!isOwner) return reply('Owner Only')
if (!q) return reply(`Example: ${prefix + command} 628xx`)
let nomor = q.replace(/[^0-9]/g, '')
let cek = await sock.onWhatsApp(nomor + '@s.whatsapp.net')
if (!cek.length) return reply('Number Invalid!')
if (Premium.includes(nomor)) return reply('Number already premium')
Premium.push(nomor)
fs.writeFileSync('./CompanyInc/prem.json', JSON.stringify(Premium))
reply(`Success add ${nomor} to premium`)
}
break
case 'delpremium':
case 'delprem': {
if (!isOwner) return reply('Owner Only')
if (!q) return reply(`Example: ${prefix + command} 628xx`)
let nomor = q.replace(/[^0-9]/g, '')
if (!Premium.includes(nomor)) return reply('Number not found')
Premium.splice(Premium.indexOf(nomor), 1)
fs.writeFileSync('./CompanyInc/prem.json', JSON.stringify(Premium))
reply(`Success delete ${nomor} from premium`)

}
break
case 'inspect':
case 'insp': {
    if (!Prem) return reply("Khusus Owner!");
    if (!m.quoted) {
        return reply("⚠️ *Format Salah!*\n\nSilakan Reply pesan yang mau di-inspect untuk dijadikan file dokumen!");
    }
    await sock.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
    try {
        let target = m.quoted;
        let type = target.mtype;
        let senderNum = (target.sender || '').split('@')[0];
        let msgStructure = target.message || 
                           (target.fakeObj && target.fakeObj.message) || 
                           target.msg;
        let realType = "unknown";
        if (msgStructure) {
            let tempStructure = msgStructure;
            if (tempStructure.viewOnceMessage && tempStructure.viewOnceMessage.message) {
                tempStructure = tempStructure.viewOnceMessage.message;
            } else if (tempStructure.documentWithCaptionMessage && tempStructure.documentWithCaptionMessage.message) {
                tempStructure = tempStructure.documentWithCaptionMessage.message;
            }
            realType = Object.keys(tempStructure)[0] || type || "unknown";
        } else {
            realType = type || "unknown";
        }
        let finalCodeOutput = "";
        if (realType === 'pollCreationMessageV3' || realType === 'pollCreationMessage') {
            let actualData = msgStructure[realType] || msgStructure || {};
            let optionsArray = actualData.options ? actualData.options.map(opt => opt.optionName) : [];
            let pollTemplate = {
                poll: {
                    name: actualData.name || "Polling",
                    values: optionsArray,
                    selectableCount: actualData.selectableOptionsCount || 1
                }
            };
            finalCodeOutput = `await sock.sendMessage(m.chat, ${JSON.stringify(pollTemplate, null, 2)})`;
        } else {
            let contentRaw = msgStructure ? msgStructure : { [realType]: target };
            finalCodeOutput = `await sock.relayMessage(m.chat, ${JSON.stringify(contentRaw, null, 2)}, {})`;
        }
        let randomId = Math.random().toString(16).substring(2, 14);
        let fileName = `insp-${randomId}.js`;
        let fileBuffer = Buffer.from(`// Inspect Result for type: ${realType}\n${finalCodeOutput}`, 'utf-8');
        await sock.sendMessage(m.chat, {
            document: fileBuffer,
            mimetype: 'application/javascript',
            fileName: fileName,
            caption: `*INSPECTED SUCCESS*`
        }, { quoted: m });

    } catch (err) {
        reply(`❌ Gagal Inspect: ${err.message}`);
    }
}
break;

//
case 'public': {
  if (!isOwner) return reply("!! *_Tú no eres un creador_* !!");

  sock.public = true;
  reply(`!! *_Éxito en el cambio de modo de lo personal a lo público_* !!`);
}
break;

case 'self': {
  if (!isOwner) return reply("!! *_Tú no eres un creador_* !!");

  sock.public = false;
  reply(`!! *_¡Éxito al cambiar del modo público al privado!_* !!`);
}
break;

// End brother:)
default:
    if (body.startsWith('>')) {
        if (!isOwner) return;
        try {
            let evaled = await eval(body.slice(2));
            if (typeof evaled !== 'string') evaled = util.inspect(evaled);
            m.reply(evaled);
        } catch (err) {
            m.reply(String(err));
        }
    }

    if (body.startsWith('$')) {
        if (!isOwner) return;
        require("child_process").exec(body.slice(1), (err, stdout) => {
            if (err) return m.reply(String(err));
            if (stdout) return m.reply(stdout);
        });
    }
}
} catch (err) {
    console.log(util.format(err));
}
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
