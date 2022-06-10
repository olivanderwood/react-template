import Cookies from 'js-cookie'

class Authen {
    token = '';

    constructor(token) {
        this.token = token
    }

    setToken(token) {
        this.token = token
    }

    getToken() {
        return this.token
    }

    clear() {
        this.token = ''
    }

}

let AuthenManager = (function () {
    let instance
    let token = Cookies.get('user_auth')?.toString() || '';

    function init() {
        return new Authen(token);
    }

    function clearCache() {
        instance.clear()
    }

    return {
        shared: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        },

        clear: function () {
            clearCache();
        }
    }
})();


export default AuthenManager;