exports.help = (prefix, pushname) => {
  return `
*💫 SENKO BOT 💫*
_Hello ${pushname}👋_ ●ω●
┏══ *🪀MAIN🪀* ══┅┅┅
❥ _${prefix}help_
❥ _${prefix}menu_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🖼️STICKER🖼️* ══┅┅┅
❥ _${prefix}sticker_
❥ _${prefix}sticker [url]_
❥ _${prefix}stickergif_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🗣️FUN🗣️* ══┅┅┅
❥ _${prefix}darkjokes_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🗃️DOWNLOADER🗃️* ══┅┅┅
❥ _${prefix}ytmp3 [url]_
❥ _${prefix}ytmp4 [url]_
❥ _${prefix}play [query]_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *📍GROUP📍* ══┅┅┅
❥ _${prefix}welcome [enable/disable]_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🔆TIMELINE🔆* ══┅┅┅
❥ _${prefix}cogan_
❥ _${prefix}cecan_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🔼LEVELING🔼* ══┅┅┅
❥ _${prefix}leveling [enable/disable]_
❥ _${prefix}level_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┏══ *🎮GAME🎮* ══┅┅┅
❥ _${prefix}siapakah_
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.wait = () => {
  return `Wait a moment...`
}
exports.done = () => {
  return `Done.`
}
exports.yt3found = (geturl) => {
  return `
┏══ *💽YTMP3💽* ══┅┅┅
❥ *Title* : ${geturl.data.result.title}
❥ *File Size* : ${geturl.data.result.size}
❥ *Resolution* : ${geturl.data.result.resolution}
❥ *Extended* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
*Note* : Audio is sending, please wait a few minutes.
`
}
exports.durationfile = () => {
  return `Durasi file melampaui batas maksimum kak!`
}
exports.wrongUrl = () => {
  return `The url is wrong!`
}
exports.needUrl = () => {
  return `Where's the url?`
}
exports.onlyGroup = () => {
  return `This can only be used in groups!`
}
exports.onlyAdminGroup = () => {
  return `This can only be used by group admins!`
}
exports.enaordisa = () => {
  return `Use *enable/disable*`
}
exports.hasOn = () => {
  return `This feature has been active before!`
}
exports.featOn = () => {
  return `Features have been activated!`
}
exports.featOff = () => {
  return `Features have been disabled!`
}
exports.msgChannel = () => {
  return `Incorrect query or query fetching channel, not video!`
}
exports.needQuery = () => {
  return `Enter a query!`
}
exports.playfound = (geturl) => {
  return `
┏══ *💽PLAY💽* ══┅┅┅
❥ *Title* : ${geturl.data.result.title}
❥ *File Size* : ${geturl.data.result.size}
❥ *Resolution* : ${geturl.data.result.resolution}
❥ *Extended* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.yt4found = (geturl) => {
  return `
┏══ *💽YTMP4💽* ══┅┅┅
❥ *Title* : ${geturl.data.result.title}
❥ *File Size* : ${geturl.data.result.size}
❥ *Resolution* : ${geturl.data.result.resolution}
❥ *Extended* : ${geturl.data.result.ext}
┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
`
}
exports.onlyOwner = () => {
  return `?This feature can only be used by bot owners!`
}
