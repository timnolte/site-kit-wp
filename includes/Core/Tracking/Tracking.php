<?php
/**
 * Class Google\Site_Kit\Core\Tracking\Tracking
 *
 * @package   Google\Site_Kit
 * @copyright 2021 Google LLC
 * @license   https://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://sitekit.withgoogle.com
 */

namespace Google\Site_Kit\Core\Tracking;

use Google\Site_Kit\Context;
use Google\Site_Kit\Core\Admin\Screen;
use Google\Site_Kit\Core\Admin\Screens;
use Google\Site_Kit\Core\Storage\User_Options;
use Google\Site_Kit\Core\Util\Method_Proxy_Trait;

/**
 * Class managing admin tracking.
 *
 * @since n.e.x.t
 * @access private
 * @ignore
 */
final class Tracking {

	use Method_Proxy_Trait;

	const TRACKING_ID = 'UA-130569087-3';

	/**
	 * Screens instance.
	 *
	 * @since n.e.x.t
	 *
	 * @var Screens
	 */
	protected $screens;

	/**
	 * Tracking_Consent instance.
	 *
	 * @since n.e.x.t
	 *
	 * @var Tracking_Consent
	 */
	protected $consent;

	/**
	 * REST_Tracking_Consent_Controller instance.
	 *
	 * @since n.e.x.t
	 *
	 * @var REST_Tracking_Consent_Controller
	 */
	private $rest_tracking_consent_controller;

	/**
	 * Constructor.
	 *
	 * @since n.e.x.t
	 *
	 * @param Context      $context      Context instance.
	 * @param User_Options $user_options Optional. User_Options instance. Default is a new instance.
	 * @param Screens      $screens      Optional. Screens instance. Default is a new instance.
	 */
	public function __construct(
		Context $context,
		User_Options $user_options = null,
		Screens $screens = null
	) {
		$user_options                           = $user_options ?: new User_Options( $context );
		$this->screens                          = $screens ?: new Screens( $context );
		$this->consent                          = new Tracking_Consent( $user_options );
		$this->rest_tracking_consent_controller = new REST_Tracking_Consent_Controller( $context, $user_options );
	}

	/**
	 * Registers functionality through WordPress hooks.
	 *
	 * @since n.e.x.t
	 */
	public function register() {
		$this->consent->register();
		$this->rest_tracking_consent_controller->register();

		add_filter( 'googlesitekit_inline_base_data', $this->get_method_proxy( 'inline_js_base_data' ) );
	}

	/**
	 * Is tracking active for the current user?
	 *
	 * @since n.e.x.t
	 *
	 * @return bool True if tracking enabled, and False if not.
	 */
	public function is_active() {
		return (bool) $this->consent->get();
	}

	/**
	 * Modifies the base data to pass to JS.
	 *
	 * @since n.e.x.t
	 *
	 * @param array $data Inline JS data.
	 * @return array Filtered $data.
	 */
	private function inline_js_base_data( $data ) {
		global $hook_suffix;
		$data['isSiteKitScreen'] = $this->screens->get_screen( $hook_suffix ) instanceof Screen;
		$data['trackingEnabled'] = $this->is_active();
		$data['trackingID']      = self::TRACKING_ID;

		return $data;
	}
}
