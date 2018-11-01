const KEYS = {
    view: 's3:view',
    theme: 's3:theme'
};

class User {
    constructor(cookie, dev) {
        this.cookie = cookie;
        this.dev = !!dev;
        this.view = localStorage.getItem(KEYS.view);
        this.theme = localStorage.getItem(KEYS.theme);
    }

    setTheme(key) {
        this.theme = key;
        localStorage.setItem(KEYS.theme, key);
    }

    setView(key) {
        this.view = key;
        localStorage.setItem(KEYS.view, key);
    }

    getTheme() {
        return this.theme;
    }

    getView() {
        return this.view;
    }

    getSavedOptions () {
        let result = {};

        Object.keys(KEYS).forEach((key) => {
            result[key] = localStorage.getItem(KEYS[key])
        });

        return result;
    }
}


export default {
    install(Vue, options) {
        Vue.prototype.$user = new User(Vue.cookie, process.env.NODE_ENV === 'development');
    }
};
