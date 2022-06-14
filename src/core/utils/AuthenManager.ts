import Cookies from "js-cookie";

class Authen {
  token = "";

  constructor(token: string) {
    this.token = token;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  clear() {
    this.token = "";
  }
}

const AuthenManager = (function () {
  let instance: Authen;
  const token = Cookies.get("user_auth")?.toString() || "";

  function init() {
    return new Authen(token);
  }

  function clearCache() {
    instance.clear();
  }

  return {
    shared() {
      if (!instance) {
        instance = init();
      }
      return instance;
    },

    clear() {
      clearCache();
    },
  };
})();

export default AuthenManager;
