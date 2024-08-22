import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation();

  const [Phrase, setPhrase] = useState('');
  const [Loading, setLoading] = useState(true);
  const [DisplayButton, setDisplayButton] = useState('ru');
  const [TranslationError, setTranslationError] = useState(false);
  const [PhraseTranslationError, setPhraseTranslationError] = useState('');

  async function translateText(text, targetLang) {
    const res = await axios.get("https://api.mymemory.translated.net/get", {
      params: {
        q: text,
        langpair: targetLang,
      }
    });

    return res.data.responseData.translatedText;
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setDisplayButton(language);
  };

  useEffect(() => {
    const displayFunc = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.quotable.io/random");
        await translateText(res.data.content, 'en|ru')
          .then(translated => {
            if (translated !== 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT') {
              setPhrase(translated);
              setTranslationError(false);
            };
          })
          .catch((err) => {
            setTranslationError(true);
            setPhrase(res.data.content);
            console.log(`Ошибка при переводе: ${err}`);
          });
      }
      catch (err) {
        setPhrase('The great ones often faced fierce opposition from medieval minds. (Albert Einstein)')
        console.log(`Ошибка при получении случайно фразы: ${err}`);
      }
      finally {
        setLoading(false)
      };
    };
    displayFunc();
  }, []);

  useEffect(() => {
    const translationFunc = async () => {
      setLoading(true);
      const Language = DisplayButton === 'en' ? 'ru' : 'en'
      await translateText(Phrase, `${Language}|${DisplayButton}`)
        .then(translated => {
          if (translated !== 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT') {
            setPhrase(translated);
            setLoading(false);
            setTranslationError(false);
          };
        })
        .catch((err) => {
          setTranslationError(true);
          setPhrase((value) => value);
          console.log(`Ошибка при переводе: ${err}`);
          setLoading(false);
        })
    };
    translationFunc();
  }, [DisplayButton]);

  useEffect(() => {
    if (TranslationError) {
      setPhraseTranslationError(Phrase + ' ERROR TRANSLATE');
    };
  }, [DisplayButton, TranslationError]);

  return (
    <div className="app">
      <main className='app__main'>
        <div className='main__box_buttons'>
          <button onClick={() => changeLanguage('en')} className='box_buttons__bitton_language' style={DisplayButton === 'ru' ? { opacity: 0.5 } : null}>en</button>
          <button onClick={() => changeLanguage('ru')} className='box_buttons__bitton_language' style={DisplayButton === 'en' ? { opacity: 0.5 } : null}>ru</button>
        </div>
        <div className='main__avatar'></div>
        <h1 className='main__name'>{t("name")}</h1>
        <h4 className='main__status'>{t("status")}</h4>
        <h2 className='main__phrases'>
          {Loading ? (
            <>
              <div class='phrases__spinner_box'>
                <div class='spinner_box__circle_border'>
                  <div class='circle_border__circle_core'></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {TranslationError ? (
                <>{PhraseTranslationError}</>
              ) : (
                <>{Phrase}</>
              )}
            </>
          )}
        </h2>
        <div className='main__menu'>
          <button className='menu__button'>{t("oneButt")}</button>
          <button className='menu__button'>{t("twoButt")}</button>
          <button className='menu__button'>{t("threeButt")}</button>
          <button className='menu__button'>{t("fourButt")}</button>
        </div>
      </main>
    </div>
  );
}

export default App;
