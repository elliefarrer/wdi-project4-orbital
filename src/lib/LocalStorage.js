const LocalStorage = {};

LocalStorage.setItem = function(key, value) {
  const options = this.getAll();
  options[key] = value;
  this.setAll(options);
};

LocalStorage.getItem = function(key) {
  return this.getAll()[key];
};

LocalStorage.getAll = function() {
  return JSON.parse(localStorage.getItem('options')) || {};
};

LocalStorage.setAll = function(options) {
  localStorage.setItem('options', JSON.stringify(options));
};

LocalStorage.removeAll = function() {
  localStorage.removeItem('options');
};

export default LocalStorage;
