let toMs = require('ms');

/**
 * Add user to db
 * @param {string} chatId
 * @param {string} jawaban
 * @param {number} expired
 * @param {object} _dir
 */
const addckl = (chatId, jawaban, expired, _dir) => {
  let obi = {id: chatId, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`) };
  _dir.push(obi);
};

/**
 * Get jawaban from db
 * @param {string} chatId
 * @param {object} _dir
 */
const getJawabanCkl = (chatId, _dir) => {
  let found = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === chatId) {
      found = i;
    }
  });
  if (found !== false) {
    return _dir[found].jawaban;
  }
};

/**
 * Dismiss messages that are not in the db
 * @param {string} chatId
 * @param {object} _dir
 */
const isCkl = (chatId, _dir) => {
  let status = false;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === chatId) {
      status = true;
    }
  });
  return status
};

/**
 * Check game time
 * @param {string} Senko
 * @param {object} _dir
 */
const cekWaktuCkl = (Senko, _dir) => {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i;
      }
    });
    if (position !== null) {
      Senko.sendText(_dir[position].id, `*Waktu habis*\n\n*Jawaban :* ${_dir[position].jawaban}`);
      _dir.splice(position, 1);
    }
  }, 1000);
};

/**
 * Get user game position
 * @param {string} chatId
 * @param {object} _db
 */
const getCklPosi = (chatId, _db) => {
  let position = null;
  Object.keys(_db).forEach((i) => {
    if (_db[i].id === chatId) {
      position = i;
    }
  });
  if (position !== null) {
    return position;
  }
};

module.exports = { addckl, getJawabanCkl, isCkl, cekWaktuCkl, getCklPosi };