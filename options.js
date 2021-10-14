const options = () => {
  const options = {
    sessionId: "senkosan",
    authTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: true,
    qrTimeout: 0,
    useChrome: true,
  }
  return options
}

module.exports = options
