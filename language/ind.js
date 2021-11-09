exports.help = (prefix, pushname) => {
  return `
*💫 SENKO BOT 💫*
_Halo ${pushname}👋_ ●ω●
┏┅ *≡ ✗ MAIN ✗*
⊙ _${prefix}help_
⊙ _${prefix}menu_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ STICKER MAKER ✗*
⊙ _${prefix}sticker_
⊙ _${prefix}sticker [url]_
⊙ _${prefix}stickergif_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ FUN ✗*
⊙ _${prefix}jokes
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ DOWNLOADER ✗*
⊙ _${prefix}ytmp3 [url]_
⊙ _${prefix}ytmp4 [url]_
⊙ _${prefix}play [query]_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ GROUP ✗*
⊙ _${prefix}welcome [enable/disable]_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ TIMELINE ✗*
⊙ _${prefix}cogan_
⊙ _${prefix}cecan_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ LEVELING ✗*
⊙ _${prefix}leveling [enable/disable]_
⊙ _${prefix}level_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ GAME ✗*
⊙ _${prefix}siapakah_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ INFO ✗*
⊙ _${prefix}listpremium_
⊙ _${prefix}cekpremium_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏┅ *≡ ✗ OWNER ✗*
⊙ _${prefix}premium [add/del] [@tag/628xxx]
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.wait = () => {
  return `Tunggu Sebentar...`
}
exports.done = () => {
  return `Selesai.`
}
exports.yt3found = (geturl) => {
  return `
┏┅ *≡ ✗ YTMP3 ✗*
⊙ *Judul* : ${geturl.data.result.title}
⊙ *Ukuran File* : ${geturl.data.result.size}
⊙ *Resolusi* : ${geturl.data.result.resolution}
⊙ *Ekstensi* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
*Note* : Audio sedang di kirim, tunggu beberapa menit.
`
}
exports.durationfile = () => {
  return `Durasi file melampaui batas maksimum kak!`
}
exports.wrongUrl = () => {
  return `Urlnya salah kak!`
}
exports.needUrl = () => {
  return `Urlnya mana kak?!`
}
exports.onlyGroup = () => {
  return `Ini hanya bisa digunakan di dalam grup kak!`
}
exports.onlyAdminGroup = () => {
  return `Ini hanya bisa digunakan oleh admin grup saja kak!`
}
exports.enaordisa = () => {
  return `Gunakan *enable/disable* kak!`
}
exports.hasOn = () => {
  return `Fitur ini sudah aktif sebelumnya kak!`
}
exports.featOn = () => {
  return `Fitur telah diaktifkan!`
}
exports.featOff = () => {
  return `Fitur telah dinonaktifkan!`
}
exports.msgChannel = () => {
  return `Query salah atau query mengambil channel, bukan video!`
}
exports.needQuery = () => {
  return `Masukan query kak!`
}
exports.playfound = (geturl) => {
  return `
┏┅ *≡ ✗ PLAY MP3 ✗*
⊙ *Judul* : ${geturl.data.result.title}
⊙ *Ukuran File* : ${geturl.data.result.size}
⊙ *Resolusi* : ${geturl.data.result.resolution}
⊙ *Ekstensi* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.yt4found = (geturl) => {
  return `
┏┅ *≡ ✗ YTMP4 ✗*
⊙ *Judul* : ${geturl.data.result.title}
⊙ *Ukuran File* : ${geturl.data.result.size}
⊙ *Resolusi* : ${geturl.data.result.resolution}
⊙ *Extensi File* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.onlyOwner = () => {
  return `Fitur ini hanya bisa di gunakan oleh owner bot!`
}
exports.unknownCmd = (prefix, pushname, args) => {
  return `┏┅ *≡ ✗ SENKO INFO ✗*
Maaf ${pushname}, perintah *${args[0]}* tidak ada di dalam *${prefix}menu*!
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.gameNotFinished = (game) => {
  return `*${game}* masih ada yang belum diselesaikan.`
}
exports.gameLevelingOff = (game) => {
  return `Untuk bermain *${game}*, Kamu perlu mengaktifkan leveling!`
}
