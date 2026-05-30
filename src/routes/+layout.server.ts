import { ORIGIN } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return { baseUrl: ORIGIN };
};
