function NestedProxy(target) {
	return new Proxy(target, {
		get(target, prop) {
			if (typeof target[prop] !== 'function') {
				return new NestedProxy(target[prop]);
			}

			return (...arguments_) =>
				new Promise((resolve, reject) => {
					target[prop](...arguments_, result => {
						if (chrome.runtime.lastError) {
							reject(chrome.runtime.lastError);
						} else {
							resolve(result);
						}
					});
				});
		}
	});
}

const chromeP =
	typeof window === 'object' && // Avoid error when executed in node
	(window.browser || new NestedProxy(window.chrome));

export default chromeP;