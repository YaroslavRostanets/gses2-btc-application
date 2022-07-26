const fs = require('fs');
const path = require('path');

/** Клас для створення екземпляру файлового кешованого сховища */
class Store {
  /**
   * Створення сховища
   * @param {string} storePath - абсолютний шлях до файлу сховища
   */
  constructor(storePath = path.join(__dirname, './store')) {

    // ToDo створення файлу store, якщо його немає
    // ToDo replace /n, /r
    this.storePath = storePath;
    this.cache = fs.readFileSync(storePath, 'utf8').split(';');
    this.cache.pop();
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
