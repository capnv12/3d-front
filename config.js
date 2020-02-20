import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
	? 'http://46.101.208.104/api'
	: 'http://localhost:8000/api';
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const DOMAIN = publicRuntimeConfig.PRODUCTION
	? publicRuntimeConfig.DOMAIN_DEVELOPMENT
	: publicRuntimeConfig.DOMAIN_PRODUCTION;
// export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME
// export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;
