export default browser;

// Adds some types that are missing or are incorrect
declare global {
	namespace browser.runtime {
		/**
		 * Requests an update check for this app/extension.
		 */
		function requestUpdateCheck(): Promise<RequestUpdateCheckStatus>;
	}

	/**
	 * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
	 */
	namespace browser.identity {
		/**
		 * Gets an OAuth2 access token using the client ID and scopes specified in the oauth2 section of manifest.json.
		 */
		function getAuthToken(details?: _GetAuthTokenDetails): Promise<string>;

		/**
		 * Removes an OAuth2 access token from the Identity API's token cache.
		 */
		function removeCachedAuthToken(
			details: _RemoveCachedAuthTokenDetails
		): Promise<void>;
	}
}

import removeCachedAuthToken = chrome.identity.removeCachedAuthToken;
// -> (callback: (status: RequestUpdateCheckStatus, details?: UpdateCheckDetails) => void): void

type Promisify<
	Type,
	Arg1 extends unknown = unknown,
	Arg2 extends unknown = unknown,
	Arg3 extends unknown = unknown,
	Arg4 extends unknown = unknown
> = Type extends (cb: (arg?: infer Arg) => void) => void
	? () => Promise<Arg>
	: Type extends (a: Arg1, cb: (arg?: infer Arg) => void) => void
	? (a: Arg1) => Promise<Arg>
	: Type extends (a: Arg1, b: Arg2, cb: (arg?: infer Arg) => void) => void
	? (a: Arg1, b: Arg2) => Promise<Arg>
	: Type extends (a: Arg1, b: Arg2, c: Arg3, cb: (arg?: infer Arg) => void) => void
	? (a: Arg1, b: Arg2, c: Arg3) => Promise<Arg>
	: Type extends (a: Arg1, b: Arg2, c: Arg3, d: Arg4, cb: (arg?: infer Arg) => void) => void
	? (a: Arg1, b: Arg2, c: Arg3, d: Arg4) => Promise<Arg>
	: never;

type promisified = Promisify<typeof removeCachedAuthToken>
// ->  () => Promise<chrome.runtime.RequestUpdateCheckStatus>
