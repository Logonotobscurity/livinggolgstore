// Minimal i18n strings; extend for locales.
export type Locale = 'en';

const STRINGS = {
  en: {
    triggerQuick: 'Ask Living Gold',
    triggerClose: 'Close',
    actionAI: 'Ask our lighting expert',
    actionWhatsApp: 'Chat on WhatsApp',
    actionSupport: 'Contact Living Gold',
    actionChatbot: 'Chatbot (Coming Soon)'
  },
} as const;

export function getStrings(locale: Locale = 'en') {
  return STRINGS[locale];
}
