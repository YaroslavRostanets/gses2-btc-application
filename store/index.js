const fs = require('fs');
const path = require('path');

/** Клас для створення екземпляру файлового кешованого сховища */
class Store {
  /**
   * Створення сховища
   * @param {string} storePath - абсолютний шлях до файлу сховища
   */
  constructor(storePath = path.join(__dirname, './store')) {
    this.init(storePath);
    this.cache = fs.readFileSync(storePath, 'utf8')
      .replace(/\n/g,'')
      .split(';');
    this.cache.pop();
    this.storePath = storePath;
  }

  /**
   * Створює файл-сховище, якщо відсутній
   * @param {string} storePath - абсолютний шлях до файлу
   */
  init(storePath) {
    try {
      fs.accessSync(storePath, fs.constants.F_OK);
    } catch (err) {
      fs.writeFileSync(storePath, '');
    }
  }

  /**
   * Додає строку в кеш та до файлу сховища
   * @param {string} str - строка, що дописуэться в кеш і у файл-сховище (в нашому випадку - email)
   */
  append(str) {
    this.cache.push(str);
    fs.appendFileSync(this.storePath, `${str};`);
  }

  /**
   * Метод для перевірки наявності строки в сховищі
   * @param {string} str - строка, наявність якої перевіряється
   * @returns {(string|undefined)} The y value.
   */
  has(str) {
    return this.cache.find(item => item === str);
  }
}

module.exports = new Store();
