import { ORIGIN } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

/** OGP の絶対 URL を構築するため、デプロイ先のオリジンをレイアウトに渡す。 */
export const load: LayoutServerLoad = () => {
	return { baseUrl: ORIGIN };
};
