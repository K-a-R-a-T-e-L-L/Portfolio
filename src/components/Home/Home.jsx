import { useEffect, useState } from 'react';
import style from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { handleGettingRandomPhrase } from '../../services/functionsHomeComponent/handleGettingRandomPhrase';
import { translatingPageContent } from '../../services/functionsHomeComponent/translatingPageContent';

const Home = () => {

    const Navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const [Phrase, setPhrase] = useState('');
    const [Loading, setLoading] = useState(true);
    const [DisplayButton, setDisplayButton] = useState('ru');
    const [TranslationError, setTranslationError] = useState(null);

    const handleRoutePath = (path) => {
        Navigate(path);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        handleGettingRandomPhrase({setTranslationError, setPhrase, setLoading, t});
    }, []);

    useEffect(() => {
        translatingPageContent({setTranslationError, setPhrase, setLoading, DisplayButton, Phrase});
    }, [DisplayButton]);

    useEffect(() => {
        if (TranslationError) {
            if (Phrase && Phrase !== t('phrase')) {
                if (!Phrase.includes('TRANSLATION ERROR')) {
                    setPhrase((value) => value + TranslationError);
                }
            }
        };
    }, [DisplayButton, TranslationError, Phrase]);

    useEffect(() => {
        setPhrase(t('phrase'));
    }, [i18n.language]);

    useEffect(() => {
        changeLanguage('ru');
    }, []);

    return (
        <div className={style.app}>
            <main className={style.app__main}>
                <div className={style.main__box_buttons}>
                    <button
                        onClick={() => changeLanguage('en')}
                        className={style.box_buttons__bitton_language}
                        style={DisplayButton === 'ru' ? { opacity: 0.5 } : null}
                    >
                        en
                    </button>
                    <button
                        onClick={() => changeLanguage('ru')}
                        className={style.box_buttons__bitton_language}
                        style={DisplayButton === 'en' ? { opacity: 0.5 } : null}
                    >
                        ru
                    </button>
                </div>
                <div className={style.main__avatar}></div>
                <h1 className={style.main__name}>{t("name")}</h1>
                <h4 className={style.main__status}>{t("status")}</h4>
                <h2 className={style.main__phrases}>
                    {Loading ? (
                        <>
                            <div class={style.phrases__spinner_box}>
                                <div class={style.spinner_box__circle_border}>
                                    <div class={style.circle_border__circle_core}></div>
                                </div>
                            </div>
                        </>
                    ) : (
                            <>{Phrase}</>
                    )}
                </h2>
                <div className={style.main__menu}>
                    <button className={style.menu__button}>{t("oneButt")}</button>
                    <button className={style.menu__button}>{t("twoButt")}</button>
                    <button className={style.menu__button}>{t("threeButt")}</button>
                    <button className={style.menu__button} onClick={() => handleRoutePath('./skills')}>{t("fourButt")}</button>
                </div>
            </main>
        </div>
    );
}

export default Home;
