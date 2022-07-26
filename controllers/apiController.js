const fetch = require('node-fetch');
const store = require('../store');

/**
 * Функція для отримання актуального курсу BTC-UAH зі стороннього сервісу
 * @returns {Promise<string>} Проміс повертає актуальний курс BTC-UAH у випадку resolve
 */
const getCurrentRate = async () => {
  const res = await fetch('https://api.coingate.com/v2/rates/merchant/btc/uah');
  return await res.text();
};

/**
 * Функція-мідлвер для отримання актуального курсу BTC-UAH
 */
const rateAction = async (req, res) => {
  // Перехоплення помилки на випадок недоступності стороннього сервісу
  try {
    const rate = await getCurrentRate();
    res.json({rate});
  } catch (err) {
    res.status(500).json();
  }
};

/**
 * Функція-мідлвер для додавання email в список
 */
const subscribeAction = async (req, res) => {
  const { email } = req.body;
  if (store.has(email)) {
    res.status(409).json({ description: "E-mail вже є в базі даних (файловій)" });
    return;
  }
  store.append(email);
  res.json({ description: "E-mail додано" });
};

module.exports = {
  rateAction,
  subscribeAction
};
