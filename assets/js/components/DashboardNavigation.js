/**
 * DashboardNavigation component.
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
 * External dependencies
 */
import { ChipSet, Chip } from '@material/react-chips';

/**
 * WordPress dependencies
 */
import { useCallback, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import {
	ANCHOR_ID_CONTENT,
	ANCHOR_ID_MONETIZATION,
	ANCHOR_ID_SPEED,
	ANCHOR_ID_TRAFFIC,
} from '../googlesitekit/constants';
import { CORE_WIDGETS } from '../googlesitekit/widgets/datastore/constants';
import {
	CONTEXT_ENTITY_DASHBOARD_TRAFFIC,
	CONTEXT_ENTITY_DASHBOARD_CONTENT,
	CONTEXT_ENTITY_DASHBOARD_SPEED,
	CONTEXT_ENTITY_DASHBOARD_MONETIZATION,
	CONTEXT_MAIN_DASHBOARD_TRAFFIC,
	CONTEXT_MAIN_DASHBOARD_CONTENT,
	CONTEXT_MAIN_DASHBOARD_SPEED,
	CONTEXT_MAIN_DASHBOARD_MONETIZATION,
} from '../googlesitekit/widgets/default-contexts';
import useDashboardType, {
	DASHBOARD_TYPE_MAIN,
} from '../hooks/useDashboardType';

const { useSelect } = Data;

export default function DashboardNavigation() {
	const dashboardType = useDashboardType();

	const [ showTraffic, showContent, showSpeed, showMonitization ] = useSelect(
		( select ) => {
			if ( dashboardType === DASHBOARD_TYPE_MAIN ) {
				return [
					select( CORE_WIDGETS ).isWidgetContextActive(
						CONTEXT_MAIN_DASHBOARD_TRAFFIC
					),
					select( CORE_WIDGETS ).isWidgetContextActive(
						CONTEXT_MAIN_DASHBOARD_CONTENT
					),
					select( CORE_WIDGETS ).isWidgetContextActive(
						CONTEXT_MAIN_DASHBOARD_SPEED
					),
					select( CORE_WIDGETS ).isWidgetContextActive(
						CONTEXT_MAIN_DASHBOARD_MONETIZATION
					),
				];
			}

			return [
				select( CORE_WIDGETS ).isWidgetContextActive(
					CONTEXT_ENTITY_DASHBOARD_TRAFFIC
				),
				select( CORE_WIDGETS ).isWidgetContextActive(
					CONTEXT_ENTITY_DASHBOARD_CONTENT
				),
				select( CORE_WIDGETS ).isWidgetContextActive(
					CONTEXT_ENTITY_DASHBOARD_SPEED
				),
				select( CORE_WIDGETS ).isWidgetContextActive(
					CONTEXT_ENTITY_DASHBOARD_MONETIZATION
				),
			];
		}
	);

	const [ selectedIds, setSelectedIds ] = useState( [] );

	const handleSelect = useCallback( ( selections ) => {
		const [ hash ] = selections;
		if ( hash ) {
			global.location.hash = hash;
		}
		setSelectedIds( selections );
	}, [] );

	return (
		<ChipSet
			className="googlesitekit-navigation"
			selectedChipIds={ selectedIds }
			handleSelect={ handleSelect }
			choice
		>
			{ showTraffic && (
				<Chip
					id={ ANCHOR_ID_TRAFFIC }
					label={ __( 'Traffic', 'google-site-kit' ) }
				/>
			) }
			{ showContent && (
				<Chip
					id={ ANCHOR_ID_CONTENT }
					label={ __( 'Content', 'google-site-kit' ) }
				/>
			) }
			{ showSpeed && (
				<Chip
					id={ ANCHOR_ID_SPEED }
					label={ __( 'Speed', 'google-site-kit' ) }
				/>
			) }
			{ showMonitization && (
				<Chip
					id={ ANCHOR_ID_MONETIZATION }
					label={ __( 'Monetization', 'google-site-kit' ) }
				/>
			) }
		</ChipSet>
	);
}
