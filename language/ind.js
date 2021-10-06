exports.help = (prefix, pushname) => {
  return `
*💫 SENKO BOT 💫*
_Halo ${pushname}👋_ ●ω●
┏══ *🪀MAIN🪀* ══┅┅┅
❥ _${prefix}help_
❥ _${prefix}menu_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🗣️FUN🗣️* ══┅┅┅
❥ _${prefix}darkjokes_
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

❥ *Resolution* : ${geturl.data.result.resolution}
❥ *Extended* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
*Note* : Audio sedang di kirim, tunggu beberapa menit.
`
}
exports.durationfile = () => {
  return `Durasi file melammpaui batas maksimum.`
}
exports.wrongUrl = () => {
  return `Url salah!`
}
