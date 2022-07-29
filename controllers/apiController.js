const fetch = require('node-fetch');
const store = require('../store');
const transport = require('../modules/mailer');

/**
 * Функція для отримання актуального курсу BTC-UAH зі стороннього сервісу
 * @returns {function} Проміс повертає актуальний курс BTC-UAH у випадку resolve
 */
const getCurrentRate = (() => {
  let rate = null;
  let updatedAt = null;
  return async () => {
    const now = Math.round(Date.now()/1000);
    if (!rate || (now - updatedAt > 60)) {
      const res = await fetch('https://api.coingate.com/v2/rates/merchant/btc/uah');
      rate = await res.text();
      updatedAt = now;
    }
    return Number(rate);
  }
})();

/**
 * Функція-мідлвер для отримання актуального курсу BTC-UAH
 */
const rateAction = async (req, res) => {
  // Перехоплення помилки на випадок недоступності стороннього сервісу
  try {
    const rate = await getCurrentRate();
    res.json({
      rate,
      description: `1BTC = ${rate}UAH`
    });
  } catch (err) {
    res.status(500).json();
  }
};

/**
 * Функція-мідлвер для додавання email в список
 */
const subscribeAction = async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400).json({ description: "Поле e-mail невірне або відсутнє" });
    return;
  }
  if (store.has(email)) {
    res.status(409).json({ description: "E-mail вже є в базі даних (файловій)" });
    return;
  }
  store.append(email);
  res.json({ description: "E-mail додано" });
};

/**
 * Функція для формування і відправки листа з курсом
 */
const sendActualRate = (email, rate) => {
  return transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Актуальний курс BTC-UAH",
    text: `Актуальний курс: ${rate}. 1BTC = ${rate}UAH`
  });
};

const sendEmailsAction = async (req, res) => {
  const rate = await getCurrentRate();
  const unsent = [];
  for await (let email of store.cache) {
    try {
      await sendActualRate(email, rate);
    } catch (err) {
      unsent.push(email);
    }
  }
  res.json({
   description: 'E-mailʼи відправлено',
   unsent: unsent.length ? unsent : undefined
  });
};

module.exports = {
  rateAction,
  subscribeAction,
  sendEmailsAction
};
