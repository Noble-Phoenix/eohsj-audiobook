// src/App.tsx
import React from 'react';
// Note: We use the i18n instance from react-i18next
import { useTranslation } from 'react-i18next';

// Define the component as a functional component (React.FC)
const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Define the type for the language code, which is a string
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    // ... your JSX content remains the same ...
    <div style={{ padding: '40px', textAlign: 'center' }}>
      
      {/* Language Switcher */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ marginRight: '10px' }}>{t('language_label')}:</span>
        <button 
          onClick={() => changeLanguage('en')} 
          disabled={i18n.language === 'en'}
        >
          English
        </button>
        <button 
          onClick={() => changeLanguage('fr')} 
          disabled={i18n.language === 'fr'}
        >
          Français
        </button>
      </div>

      {/* Translated Content */}
      <h1>{t('title')}</h1>
      <p>
        <button style={{ padding: '10px 20px', fontSize: '1.2em' }}>
          {t('call_to_action')}
        </button>
      </p>

    </div>
  );
};

export default App;