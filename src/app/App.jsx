import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation();

  const [Phrase, setPhrase] = useState('');
  const [Loading, setLoading] = useState(true);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  window.onload = () => {
    axios.get("https://api.quotable.io/random")
      .then((res) => {
        setPhrase(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (Phrase === '') {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }, [Phrase]);

  return (
    <div className="app">
      <main className='app__main'>
        <button onClick={() => changeLanguage('ru')}>ru</button>
        <button onClick={() => changeLanguage('en')}>en</button>
        <div className='main__avatar'></div>
        <h1 className='main__name'>{t("name")}</h1>
        <h4 className='main__status'>{t("status")}</h4>
        <h2 className='main__phrases'>
          {Loading ? (
            <>
              Loading
            </>
          ) : (
            { Phrase }
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
