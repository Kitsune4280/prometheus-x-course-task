const LS_KEYS = {
	STORE_CART: 'jsbandstore_cart',
	STORE_RECENT: 'jsbandstore_recent',
	STORE_USER: 'jsbandstore_user',
};

class LocalStorageService {
	static get(key) {
		const value = window.localStorage.getItem(key);

		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}

	static set(key, value) {
		return window.localStorage.setItem(key, JSON.stringify(value));
	}

	static remove(key) {
		return window.localStorage.removeItem(key);
	}
}

export { LocalStorageService, LS_KEYS };
