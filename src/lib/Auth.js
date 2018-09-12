const Auth = {};

Auth.isAuthenticated = function() {
  return !!this.getToken();
};

Auth.setToken = function(token) {
  localStorage.setItem('token', token);
};

Auth.getToken = function() {
  return localStorage.getItem('token');
};

Auth.removeToken = function() {
  localStorage.removeItem('token');
};

Auth.getPayload = function() {
  if(this.getToken()) {
    const token = this.getToken();
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
};

Auth.currentFirstName = function() {
  return this.getPayload().name;
};

Auth.currentUserId = function() {
  if(this.getToken()) {
    return this.getPayload().sub;
  }
};

Auth.currentProfilePic = function() {
  if(this.getToken()) {
    return this.getPayload().profilePic;
  }
};

Auth.currentPostcode = function() {
  return this.getPayload().postcode;
};

Auth.bearerHeader = function() {
  return {
    headers: {
      authorization: `Bearer ${Auth.getToken()}`
    }
  };
};

export default Auth;
