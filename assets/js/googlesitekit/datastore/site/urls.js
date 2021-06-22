/**
 * `core/site` data store: urls.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { getLocale, getLocaleLanguage } from '../../../util';

export const initialState = {};

export const actions = {};

export const controls = {};

export function reducer( state ) {
	return state;
}

export const resolvers = {};

export const selectors = {
	/**
	 * Gets an external Google URL that includes the user's locale.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state          Data store's state.
	 * @param {Object} [args]         Optional arguments for the resulting URL.
	 * @param {string} [args.website] Base URL hostname and schema.
	 * @param {string} [args.path]    URL path to build complete URL with starting slash.
	 * @param {Object} [args.query]   Object to append query to the URL.
	 * @param {string} [args.hash]    Optional hash.
	 * @param {string} [args.locale]  Optional locale.
	 * @return {(string|null)} The URL containing the user's locale or `null` if path is not set.
	 */
	getGoogleURL( state, args ) {
		const {
			website,
			path,
			query,
			hash,
			locale = getLocale(),
		} = args || {};

		if ( ! path ) {
			return null;
		}

		const url = new URL( website );

		url.pathname = path;
		url.hash = hash || '';

		const params = { ...query, hl: locale };
		for ( const key in params ) {
			url.searchParams.set( key, params[ key ] );
		}

		return url.toString();
	},

	/**
	 * Gets an external help link that includes the user's locale.
	 *
	 * @since 1.24.0
	 *
	 * @param {Object} state         Data store's state.
	 * @param {Object} [args]        Optional arguments for the resulting URL.
	 * @param {string} [args.path]   URL path to build complete URL with starting slash.
	 * @param {Object} [args.query]  Object to append query to the URL.
	 * @param {string} [args.hash]   Optional hash.
	 * @param {string} [args.locale] Optional locale.
	 * @return {(string|null)} The URL containing the user's locale or `null` if path is not set.
	 */
	getGoogleSupportURL( state, args ) {
		return selectors.getGoogleURL( state, { ...args, website: 'https://support.google.com' } );
	},

	/**
	 * Gets the Google privacy policy URL.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {string} The Google privacy policy URL.
	 */
	getGooglePrivacyPolicyURL( state ) {
		return selectors.getGoogleURL( state, {
			website: 'https://myaccount.google.com',
			path: '/privacypolicy',
			locale: getLocaleLanguage(),
		} );
	},

	/**
	 * Gets the Google terms URL.
	 *
	 * @since n.e.x.t
	 *
	 * @param {Object} state Data store's state.
	 * @return {string} The Google terms URL.
	 */
	getGoogleTermsURL( state ) {
		return selectors.getGoogleSupportURL( state, {
			path: '/terms',
			locale: getLocaleLanguage(),
		} );
	},
};

export default {
	initialState,
	actions,
	controls,
	reducer,
	resolvers,
	selectors,
};
