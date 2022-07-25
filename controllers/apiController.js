const fetch = require('node-fetch');

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

const subscribeAction = async (req, res) => {

};

module.exports = {
  rateAction
};
