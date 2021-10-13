exports.help = (prefix, pushname) => {
  return `
*💫 SENKO BOT 💫*
_Halo ${pushname}👋_ ●ω●
┏══ *🪀MAIN🪀* ══┅┅┅
❥ _${prefix}help_
❥ _${prefix}menu_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🖼️STICKER🖼️* ══┅┅┅
❥ _${prefix}sticker
❥ _${prefix}sticker [url]
❥ _${prefix}stickergif
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🗣️FUN🗣️* ══┅┅┅
❥ _${prefix}darkjokes_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🗃️DOWNLOADER🗃️* ══┅┅┅
❥ _${prefix}ytmp3_ [url]
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
┏══ *💽YTMP3💽* ══┅┅┅
❥ *Judul* : ${geturl.data.result.title}
❥ *Ukuran File* : ${geturl.data.result.size}
❥ *Resolusi* : ${geturl.data.result.resolution}
❥ *Ekstensi* : ${geturl.data.result.ext}
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
