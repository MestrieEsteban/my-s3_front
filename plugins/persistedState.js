import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
	createPersistedState({
		storage: {
			getItem: (key) => {
				if (process.server) {
					const parsedCookies = typeof req.headers.cookie == 'string' ? cookie.parse(req.headers.cookie) : '';
					return parsedCookies[key];
				} else {
					return Cookies.get(key);
				}
			},
			setItem: (key, value) =>
				Cookies.set(key, value, { expires: 365, secure: false }),
			removeItem: key => Cookies.remove(key)
		}
	})(store);
};