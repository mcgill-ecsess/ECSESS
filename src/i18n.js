import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import translationEn from './public/locales/en/translation.json';
import translationFr from './public/locales/fr/translation.json';

const resources = {
	en: {
		translation: translationEn
	},
	fr: {
		translation: translationFr
	}
};

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		debug: true,

		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
