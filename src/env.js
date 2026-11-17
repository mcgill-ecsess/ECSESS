import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ SANITY_ID: { static: true } });
