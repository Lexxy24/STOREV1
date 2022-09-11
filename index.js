"use strict";
const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor } = require('./lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid } = require("./lib/myfunc");

// Apinya
const fs = require ("fs");
const util = require('util')
const chalk = require('chalk');
const hikki = require("hikki-me");
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const java_script = require("javascript-obfuscator");
const speed = require("performance-now");

// Database
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./temp/mess.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));

// Response
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list');

const Exif = require("./lib/exif")
const exif = new Exif()
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(conn, msg, m, setting, store, welcome) => {
try {
let { ownerNumber, botName, ownerName } = setting
let { allmenu } = require('./help')

const { type, quotedMsg, mentioned, now, fromMe } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const toJSON = j => JSON.stringify(j, null,'\t')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = ownerNumber == sender ? true : ["6285789004732@s.whatsapp.net","6283834558105@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
const dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate

const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const participants = isGroup ? await groupMetadata.participants : ''

const isAntiLink = antilink.includes(from) ? true : false

const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
function jsonformat(string) {return JSON.stringify(string, null, 2)}
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = conn.sendMessage(from, { text: teks, mentions: mems })
return res } else { let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res}}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const reply = (teks) => {conn.sendMessage(from, { text: teks }, { quoted: msg })}
const textImg = (teks) => {return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })}
const sendMess = (hehe, teks) => {conn.sendMessage(hehe, { text, teks })}
const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync(setting.pathimg)}}}

const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

function toRupiah(angka) {
var balancenyeini = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
}

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

// Anti Link
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy')
reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
conn.groupParticipantsUpdate(from, [sender], "remove")
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

//Auto Block Nomor Luar Negeri
if (sender.startsWith('212')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('91')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('92')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('90')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('54')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('55')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('40')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('94')) {
return conn.updateBlockStatus(sender, 'block')
}
if (sender.startsWith('60')) {
return conn.updateBlockStatus(sender, 'block')
}

// Console Logs
if (isCmd && !fromMe) {console.log("[" + chalk.green(" CMD ") + "]" + chalk.yellow("=") + "[ " + chalk.green(`${pushname}`) + " ]" + chalk.yellow("=") + "[ " + chalk.green(`${command}`) + " ]" + chalk.yellow("=") + "[ " + chalk.green(`${jam}`) + " ]"  )}

let teks_menu =`*${ucapanWaktu} ${pushname}*

━━━「 *DATA SERVER* 」━━━
⫹ Library : *Baileys-MD*.
⫹ Waktu : ${tanggal}
⫹ Jam : ${jam}
⫹ Creator : ${ownerName}
⫹ Bot Name : ${botName}
━━━━━━━━━━━━━━━━━━━
 _*Runtime Bot :*_
${runtime(process.uptime())}
━━━━━━━━━━━━━━━━━━━

${allmenu(prefix)}
`

// INI CASE NYA
switch(command) {
case 'menu':
let button_menu = [
{ buttonId: `${prefix}owner`, buttonText: { displayText: "Owner" }, type: 1 },
{ buttonId: `${prefix}ping`, buttonText: { displayText: "Speed" }, type: 1 },
{ buttonId: `${prefix}rules`, buttonText: { displayText: "Rules" }, type: 1 }
]
const ini_message_Menu = {
image: await reSize(setting.pathimg, 300, 200),
caption: teks_menu,
footer: setting.footer,
buttons: button_menu,
headerType: 4
}
const sendMsg = await conn.sendMessage(from, ini_message_Menu, { quoted: fkontak })
break
case 'rules':
let text_rules =`━━━「 *RULES-BOT* 」━━━

1. Jangan Spam/Mengeksploitasi Bot
Sanksi: *❎ WARN/SOFT BLOCK*

2. Dilarang Tlpn/Vc Bot
Sanksi: *❎ SOFT BLOCK*

3. Dilarang Culik Bot Ke Grup Kecuali Atas Izin Owner.
Sanksi: *PERMANENT BLOCK*

Jika sudah dipahami rules-nya, silakan ketik *#menu* untuk memulai!
Segala kebijakan dan ketentuan *${botName}* di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, atau memblokir user(*﹏*)

© Created by ${ownerName}`
reply(text_rules)
break
case 'owner':
let [x2] = ownerNumber
reply("https://wa.me/" + x2.split("@")[0])
break
case 'tes':
reply('on')
break
case 'tiktok':{
if (!q) return reply(`contoh :\n${prefix+command} https://vt.tiktok.com/ZSdbFNn96/?k=1`)
var url = q
var fatihh = await fetchJson(`https://hadi-api.herokuapp.com/api/tiktok?url=${url}`)
if (fatihh.msg) return reply('Link URL tidak valid')
reply(mess.wait)
var fatih = fatihh.result
conn.sendMessage(from, { video: { url: fatih.video.nowm }, caption: 'done!! no watermak' }, { quoted: msg })
conn.sendMessage(from, { audio: { url: fatih.audio_only.original }, mimetype: 'audio/mpeg', fileName: `${fatih.title}.mp3` }, { quoted: msg })
}
break
case 'ytmp4':
case 'ini_videonya':
if (!q) return reply(`Kirim perintah ${prefix+command} https://youtu.be/PdJnRZRbveE`)
var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/video?url=${q}`)
var data = datah.result
var txtt = `*YOUTUBE DOWNLOADER*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.resolution}\n*≻ Size :* ${data.size}\n*≻ Type : ${data.ext}*\n*≻ Url Source :* ${q.split(" ")[0]}\n\n_Sedang Mengirim Media..._`
var teks = `Done!`
conn.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
conn.sendMessage(from, { video: { url: data.download_video }, caption: teks }, { quoted: msg })
break
case 'ytmp3':
case 'ini_musiknya':
if (!q) return reply(`Kirim perintah ${prefix+command} https://youtu.be/PdJnRZRbveE`)
var datah = await fetchJson(`https://hadi-api.herokuapp.com/api/yt2/audio?url=${q}`)
var data = datah.result
var txtt = `*YOUTUBE DOWNLOADER*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.resolution}\n*≻ Size :* ${data.size}\n*≻ Type :* ${data.ext}\n*≻ Url Source :* ${q.split(" ")[0]}\n\n_Sedang Mengirim Media..._`
var teks = `Done!`
conn.sendMessage(from, { image: { url: data.thumb }, caption: txtt }, { quoted: msg })
conn.sendMessage(from, { audio: { url: data.download_audio}, mimetype: 'audio/mpeg', fileName: `${data.title}.mp3` }, { quoted:msg })
break
case 'nulis':
if (!q) return reply(`Yang Mau Di Tulis Apaan? Titit?\n\nContoh :\n${prefix+command} Hello`)
reply(mess.wait)
var tulisan = q
var splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
var fixHeight = splitText.split('\n').slice(0, 31).join('\n')
spawn('convert', ['./storage/nulis/buku/sebelumkanan.jpg','-font','./storage/nulis/font/Indie-Flower.ttf','-size','960x1280','-pointsize','23','-interline-spacing','2','-annotate','+128+129',fixHeight,'./storage/nulis/buku/setelahkanan.jpg'])
.on('error', () => reply('error'))
.on('exit', () => {
conn.sendMessage(from, { image: fs.readFileSync('./storage/nulis/buku/setelahkanan.jpg')}, {quoted: msg, caption: `Jangan Malas Kak...`})
})
break
case 'play':
if (!q) return reply(`Contoh :\n${prefix+command} preset angel baby`)
let play_nyaa = await fetchJson(`https://api-yogipw.herokuapp.com/api/yt/search?query=${q}`)
let play_link = pickRandom(play_nyaa.result)
let text_play =`*YOUTUBE PLAY*\nTitle : ${play_link.title}\nTimestamp : ${play_link.timestamp}\nDi Upload : ${play_link.ago}\nAuthor : ${play_link.author.name}`
let button_play = [
{ buttonId: `${prefix}ini_musiknya ${play_link.url}`, buttonText: { displayText: "Musik" }, type: 1 },
{ buttonId: `${prefix}ini_videonya ${play_link.url}`, buttonText: { displayText: "Video" }, type: 1 }
]
const ini_message_Play = {
image: await getBuffer(play_link.thumbnail),
caption: text_play,
footer: 'pilih media di bawah ini.',
buttons: button_play,
headerType: 4
}
const sendPlay = await conn.sendMessage(from, ini_message_Play, { quoted: msg })
break
case 'mediafire':
if (!q) return reply(`Contoh :\n${prefix+command} https://www.mediafire.com/file/4jzmc4boquizy0n/HAPUS_CONFIG_FF_MAX.7z/file`)
let { mediafireDl } = require('./lib/mediafire')
let link_nya = q
const result_mediafire = await mediafireDl(link_nya)
let text_mediafire = `*MEDIAFIRE DOWNLOAD*	
Judul : ${result_mediafire[0].nama}
Type : ${result_mediafire[0].mime}
Size : ${result_mediafire[0].size}
Link : ${result_mediafire[0].link}
			
_Sedang Mengirim file._`
reply(text_mediafire)
conn.sendMessage(from, { document : { url : result_mediafire[0].link}, fileName : result_mediafire[0].nama, mimetype: result_mediafire[0].mime }, { quoted : msg }) 
break
case 'gitclone':
if (!q) return reply('Linknya Mana?')
reply(mess.wait)
let res_git = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = q.match(res_git) || []
repo = repo.replace(/.git$/, '')
let ini_url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(ini_url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
conn.sendMessage(from, { document: { url: ini_url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: msg })
break
case 'simi':
if (!q) return reply(`*Contoh* : ${prefix+command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(balas_simi => {reply(balas_simi.success)})
break
case 'tes':
case 'runtime':
let timestamp = speed()
let latensi = speed() - timestamp
let respon_nya = `Runtime : ${runtime(process.uptime())}`
reply(respon_nya)
break
case 'ping':
let ini_timestamp = speed()
let ini_latensi = speed() - ini_timestamp
let text_ping = `Kecepatan Respon ${ini_latensi.toFixed(4)} _Second_`
reply(text_ping)
break
case 'obfus':
case 'obfuscator':
if (!q) return reply(`Kode Js Nya?`)
let ini_kode_jsnya = q
let result_obfus = java_script.obfuscate(`${ini_kode_jsnya}`,
{compact: false, controlFlowFlattening: true, controlFlowFlatteningThreshold: 1, numbersToExpressions: true, simplify: true, stringArrayShuffle: true, splitStrings: true, stringArrayThreshold: 1 });
reply(result_obfus.getObfuscatedCode())
break
case 'tambah':
case 'tambah_kan':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* tanda *angka*\n\n_Contoh_\n\n${command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
case 'kurang_kan':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* tanda *angka*\n\n_Contoh_\n\n${command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
case 'kali_kan':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* tanda *angka*\n\n_Contoh_\n\n${command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
case 'bagi_kan':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* tanda *angka*\n\n_Contoh_\n\n${command} 2 + 2`)
var nilai_one = Number(q.split(" ")[0])
var nilai_two = Number(q.split(" ")[1])
reply(`${nilai_one / nilai_two}`)
break
case 'ssweb':
if (!q) return reply(`Format Invalid Atau Url Yang Kamu Ketik Tidak Di Temukan !!\n\nContoh :\n${prefix+command} google.com`)
var web = `https://hadi-api.herokuapp.com/api/ssweb?url=${q}&device=desktop&full=on`
conn.sendMessage(from, { image: { url: web }, caption: 'Done!!' }, { quoted:msg })
break
case 'toimg':
if (!isQuotedSticker) return reply(`Reply stikernya!`)
var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'temp/'+getRandom('.webp')
var rand2 = 'temp/'+getRandom('.png')
fs.writeFileSync(`./${rand1}`, buffer)
if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
reply(mess.wait)
exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
fs.unlinkSync(`./${rand1}`)
if (err) return reply(mess.error.api)
conn.sendMessage(from, {caption: `*Sticker Convert To Image!*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: fkontak })
fs.unlinkSync(`./${rand2}`)
})
} else {
reply(mess.wait)
webp2mp4File(`./${rand1}`).then(async(data) => {
fs.unlinkSync(`./${rand1}`)
conn.sendMessage(from, {caption: `*Sticker Convert To Video!*`, video: await getBuffer(data.data) }, { quoted: fkontak })
})
}
break
case 'sticker': case 'stiker': case 's':
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) { buffer = Buffer.concat([buffer, chunk]) }
reply(mess.wait)
var rand1 = 'temp/sticker/'+getRandom('.jpg')
var rand2 = 'temp/sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else if (isVideo || isQuotedVideo) {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) { buffer = Buffer.concat([buffer, chunk])}
var rand1 = 'temp/sticker/'+getRandom('.mp4')
var rand2 = 'temp/sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)})}).addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"]).toFormat('webp').save(`${rand2}`)
} else {
reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
}
break
case 'broadcast': case 'bc':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} teks`)
var data = await store.chats.all()
var teks = `${q}\n© Broadcast ${botName}`
for (let i of data) { 
conn.sendMessage(i.id, { text: teks })
await sleep(1000)
}
reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
break
case 'creategc':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`*Example :*\n${prefix+command} namagroup`)
var nama_nya = q
let cret = await conn.groupCreate(nama_nya, [])
let response = await conn.groupInviteCode(cret.id)
var teks_creategc = `  「 *Create Group* 」

_*▸ Name : ${cret.subject}*_
_*▸ Owner : @${cret.owner.split("@")[0]}*_
_*▸ Time : ${moment(cret.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} WIB*_

*Link Create Group* :
https://chat.whatsapp.com/${response}
`
reply(teks_creategc)
break
case 'join':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
if (!isUrl(args[1])) return reply(mess.error.Iv)
var url = args[1]
url = url.split('https://chat.whatsapp.com/')[1]
var data = await conn.groupAcceptInvite(url)
reply(jsonformat(data))
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'setpp': case 'setppbot':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (isImage || isQuotedImage) {
var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
if (args[1] == '\'panjang\'') {
var { img } = await generateProfilePicture(media)
await conn.query({ tag: 'iq', attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture' },
content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
fs.unlinkSync(media)
reply(`Sukses`)
} else {
var data = await conn.updateProfilePicture(botNumber, { url: media })
fs.unlinkSync(media)
reply(`Sukses`)
}
} else {
reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
}
break
case 'setnamegc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Support ${ownerName}`)
await conn.groupUpdateSubject(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setdesc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *text*\n\n_Contoh_\n\n${prefix+command} New Description by ${ownerName}`)
await conn.groupUpdateDescription(from, q)
.then( res => {
reply(`Sukses`)
}).catch(() => reply(mess.error.api))
break
case 'setppgrup': case 'setppgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isImage || isQuotedImage) {
var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
if (args[1] == '\'panjang\'') {
var { img } = await generateProfilePicture(media)
await conn.query({ tag: 'iq', attrs: { to: from, type:'set', xmlns: 'w:profile:picture' },
content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }] })
fs.unlinkSync(media)
reply(`Sukses`)
} else {
var data = await conn.updateProfilePicture(from, { url: media })
fs.unlinkSync(media)
reply(`Sukses`)
}
} else {
reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
}
break
case 'open':
case 'buka_grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
break
case 'close':
case 'tutup_grup':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
break
case 'grup': case 'group':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isAntiLink) return reply(`antilink sudah aktif`)
if (!args[0]) return conn.sendMessage(from, { text: "[ *GROUP SETTING* ]\n\npilih buka atau tutup", footer: `Group : ${groupName}`, buttons: [{buttonId: `${prefix+command} y`, buttonText: {displayText: 'Open ✅'}, type: 1}, {buttonId: `${prefix+command} n`, buttonText: {displayText: 'Close ❌'}, type: 1}],headerType: 1 })
if (args[0] == "y") {
conn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
}
if (args[0] == "n") {
conn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
}
break
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'add':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (groupMembers.length == 257) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
var mems = []
groupMembers.map( i => mems.push(i.id) )
var number;
if (args.length > 1) {
number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else if (isQuotedMsg) {
number = quotedMsg.sender
var cek = await conn.onWhatsApp(number)
if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
conn.groupParticipantsUpdate(from, [number], "add")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else {
reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else if (isQuotedMsg) {
number = quotedMsg.sender
conn.groupParticipantsUpdate(from, [number], "remove")
.then( res => reply(jsonformat(res)))
.catch((err) => reply(jsonformat(err)))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'promote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
}
break
case 'demote':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (mentionUser.length !== 0) {
conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply(mess.error.api))
} else if (isQuotedMsg) {
conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
}
break
case 'leave':
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!isGroup) return reply(mess.OnlyGrup)
conn.groupLeave(from)
reply('bye')
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await conn.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
conn.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
conn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'mysesi':
case 'sendsesi':
case 'session':
if (!isOwner) return reply(mess.OnlyOwner)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
break
case 'antilink':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (isAntiLink) return reply(`antilink sudah aktif`)
if (!args[0]) return conn.sendMessage(from, { text: "[ *ANTILINK* ]\n\npilih on atau off", footer: 'setting antilink.', buttons: [{buttonId: `${prefix+command} on`, buttonText: {displayText: 'on'}, type: 1}, {buttonId: `${prefix+command} off`, buttonText: {displayText: 'off'}, type: 1}],headerType: 1 })
if (args[0] == "on") {
if (isAntiLink) return reply(`antilink sudah aktif`)
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfull Activate Antilink In This Group')}
if (args[0] == "off") {
if (!isAntiLink) return reply(`antilink telah mati`)
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfull Disabling Antilink In This Group')
}
break
case 'cekitem': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hi @${sender.split("@")[0]}`,
buttonText: 'Click Here!',
footer: `*List From ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
conn.sendMessage(from, listMsg)
break
case 'additem': case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]                
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./media/${sender}`)
const fd = new FormData();
fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
reply(`Berhasil menambah List menu *${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
})
} else {
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'delitem':
case 'dellist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'p': case 'proses':
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!isQuotedMsg) return ('Reply Pesanannya!')
let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
mentions(proses, [quotedMsg.sender], true)
break
case 'd': case 'done':
if (!isGroup) return ('Hanya Dapat Digunakan Gi Group')
if (!isOwner && !isGroupAdmins) return ('Hanya Bisa Digunakan Oleh Admin')
if (!isQuotedMsg) return ('Reply Pesanannya!')
let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order ya🙏`
mentions(sukses, [quotedMsg.sender], true)
break
case 'fancytext': case 'fancy':{
if (!q) return reply(`Contoh :\n${prefix+command} hello`)
let ini_textnya = q
reply(mess.wait)
var { styletext } = require('./lib/scrape')
let anu = await styletext(ini_textnya)
teks = ` ━━━「 *FANCY-TEXT* 」━━━\n\n*Text Ori :* ${ini_textnya}\n\n`
for (let i of anu) {
teks += `*nama :* ${i.name}\n*result :* ${i.result}\n\n`
}
reply(teks)
}
break
case 'kal': case 'kalkulator':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* tanda *angka*\n\n_Contoh_\n\n${prefix+command} 2 2`)
const sections = [
{ title: "PILIH OBJECT", rows: [ 
{title: "Tambah", rowId: `${prefix}tambah_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di tambah (+)"},
{title: "Kurang", rowId: `${prefix}kurang_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di kurang (-)"},
{title: "Kali", rowId: `${prefix}kali_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di kali (×)"},
{title: "Bagi", rowId: `${prefix}bagi_kan ${q.split(" ")[0]} ${q.split(" ")[1]}`, description: "di bagi (÷)"}
]}]
const listMessage = {
text: `Hallo ${pushname} ${ucapanWaktu}`,
footer: "® kalkulator ( + - ÷ × )",
title: "[ *Hitung Otomatis* ]",
buttonText: "pilih_disini",
mentions: ownerNumber, sections}
conn.sendMessage(from, listMessage)
break
case 'topupff':{
if (!q) return reply(`*_Format Topup Diamond FF_*\n\n_Example_\n${prefix+command} idff\n\n_Contoh_\n${prefix+command} 239814337\n\n*Note :*\nkesalahan input id tujuan bukan tanggung jawab admin!.`)
const sections = [
{ title: "Pilih Nominal Topup", rows: [ 
{title: "5 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&5`, description: "Rp1.261"},
{title: "12 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&12`, description: "Rp2.523"},
{title: "70 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&70`, description: "Rp12.614"},
{title: "140 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&140`, description: "Rp25.227"},
{title: "355 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&355`, description: "Rp63.068"},
{title: "355 Diamond 💎", rowId: `${prefix}cek_data_ff ${q.split(" ")[0]}&720`, description: "Rp126.136"}
]}]
const listMessage = {
text: `\n*Silahkan Pilih Nominal Topup Diamond Yang Tersedia.*

*_Note: Pembayaran Disini Hanya Menggunakan Server, Owner Tidak Mendapatkan Hasil Apapun Disini Karena Diproses Langsung Dari Server Otomatis Dunia Games!._*

*_Jika Sudah Melakukan Pemilihan Nominal, Anda Akan Dikirimkan Qris Pembayaran Dan Anda Harus Membayar Melalu Aplikasi E-wallet Yang Mendukung Qris, Pastikan Nominal Yang Anda Transfer Harus Sama Dengan Nominal Yang Diminta!._*

*_Jika Anda Sudah Melakukan Pembayaran, Silahkan Tunggu 1-2 Menit Dan Diamond Otomatis Masuk Ke Akun Free Fire Anda!._*\n`,
footer: "web api : duniagames.co.id",
title: "━━━「 *TOPUP FREE FIRE* 」━━━",
buttonText: "KLIK DISINI",
mentions: ownerNumber, sections}
conn.sendMessage(from, listMessage, { quoted: fkontak })
}
break
case 'cek_data_ff':
if (!q) return reply(`*_Format Topup Diamond FF_*\n\n_Example_\n${prefix+command} idff&nominal\n\n_Contoh_\n${prefix+command} 239814337&70\n\n*_Nominal Tersedia_*\n_5-12-70-140-355-720_\n\n*Note :*\nkesalahan input id&nominal bot otomatis blokir user permanen.`)
let ini_idnya = q.split("&")[0]
let ini_jumlahnya = q.split("&")[1]
const makeSession = await hikki.game.topupFreeFire(ini_idnya, ini_jumlahnya) // support nominal 5 12 70 140 355 720
let data_id = makeSession.data.gameId
let data_name = makeSession.data.userNameGame
let data_jumlah = ini_jumlahnya
let data_harga = makeSession.data.totalPrice
let data_nya = `
*KONFIRMASI TRANKSAKSI*
ID Game : ${data_id}
Username : *${makeSession.data.userNameGame}*
Jumlah : *${ini_jumlahnya}* diamond 💎
Code Item : *free_fire${ini_jumlahnya}*
Payment : *QRIS*
Harga : *Rp${toRupiah(makeSession.data.totalPrice)}*

*Tranksaksi ID :* ${makeSession.data.transactionId}`
const buttonMessageee = {
text: data_nya,
footer: 'Jika data semua benar klik button ✅\nDan jika ada yang salah klik button ❌',
buttons: [
{ buttonId: `${prefix}batal_kan ${makeSession.data.transactionId}`, buttonText: {displayText: 'Salah ❌'}, type: 1},
{ buttonId: `${prefix}lanjut_kan ${ini_idnya}&${ini_jumlahnya}&${data_harga}`, buttonText: {displayText: 'Benar ✅'}, type: 1}
],
headerType: 1}
conn.sendMessage(from, buttonMessageee)
break
case 'batal_kan':
let id_tranksaksi = q.split(" ")[0]
let text_batalkan = `Baik kak 😊 Tranksaksi ID : ${id_tranksaksi}, Telah Kami Batalkan.`
reply(text_batalkan)
break
case 'lanjut_kan':
async function topupFreeFire() {
const makeSession = await hikki.game.topupFreeFire(q.split("&")[0], q.split("&")[1])
return await hikki.game.payDiamond(makeSession, '085789004732')
}
topupFreeFire().then(res => {
let text_bayar_ff =`*Scan QR Di Atas*\n\n*ID Game : ${q.split("&")[0]}*\n*Jumlah : ${q.split("&")[1]} Diamond 💎*\n*Total Harga : Rp${toRupiah(q.split("&")[2])}*\n\n_Jika sudah transfer, tunggu 3-10 menit diamond otomatis masuk_\n\n*_Note : QRIS berlaku 5 menit_*`
conn.sendMessage(from, { image: { url: res.qrCode }, caption: text_bayar_ff }, { quoted:msg })
})
break
case 'topupml':
reply('Fitur akan segera rilis')
break
case 'ringtone': {
if (!q) return reply(`Contoh :\n${prefix+command} iphone`)
reply(`Searching Ringtone ${q} 🔎`)
var { ringtone } = require('./lib/scrape')
let anu = await ringtone(q)
var result = anu[Math.floor(Math.random() * anu.length)]
conn.sendMessage(from, {audio: { url: result.audio}, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
case 'tts':{
var tts = await getBuffer(`https://hadi-api.herokuapp.com/api/tts?language=id&text=${q}`)
if (!q) return reply(`Contoh :\n${prefix+command} hallo`)
reply(mess.wait)
conn.sendMessage(from, {audio: tts, mimetype:'audio/mpeg', ptt:true }, {quoted:msg})
}
break
//BATAS
default:
}} catch (err) {
console.log(color('[ERROR]', 'red'), err)}}
