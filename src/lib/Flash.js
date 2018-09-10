const Flash = {};

Flash.messages = null;

Flash.setMessage = function(type, content) {
  this.messages = this.messages || [];
  this.messages.push({ type, content });
};

Flash.getMessages = function() {
  return this.messages;
};

Flash.clearMessages = function() {
  this.messages = null;
};

export default Flash;
