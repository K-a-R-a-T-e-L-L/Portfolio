import { useEffect, useState } from 'react';
import style from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { handleGettingRandomPhrase } from '../../../services/functionsHomeComponent/handleGettingRandomPhrase';
import { translatingPageContent } from '../../../services/functionsHomeComponent/translatingPageContent';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Ava from '../../../images/ava.png';
import AvaPreview from '../../../images/avaPreview.png';

const Home = () => {

    const Navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const [Phrase, setPhrase] = useState('');
    const [Loading, setLoading] = useState(true);
    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');
    const [TranslationError, setTranslationError] = useState(null);
    const [WidthWindow, setWidthWindow] = useState(null);

    const handleRoutePath = (path) => {
        Navigate(path);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        const handleWidthWindow = () => {
            setWidthWindow(window.innerWidth < 800 ? (window.innerWidth < 400 ? '25px' : '50px') : '100px');
        };
        handleWidthWindow();
        window.addEventListener('resize', handleWidthWindow);
        return () => {
            window.removeEventListener('resize', handleWidthWindow);
        };
    }, []);

    useEffect(() => {
        handleGettingRandomPhrase({ setTranslationError, setPhrase, DisplayButton, setLoading, t });
    }, []);

    useEffect(() => {
        translatingPageContent({ setTranslationError, setPhrase, setLoading, DisplayButton, Phrase });
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
        changeLanguage(DisplayButton);
    }, []);

    return (
        <div className={style.app}>
            <main className={style.app__main}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={WidthWindow} />
                <div className={style.main__avatar}>
                    <LazyLoadImage className={style.main__avatar} src={Ava} placeholderSrc={AvaPreview} alt='Avatar' />
                </div>
                <h1 className={style.main__name}>{t("homePage.name")}</h1>
                <h4 className={style.main__status}>{t("homePage.status")}</h4>
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
                    <button className={style.menu__button} onClick={() => handleRoutePath('./about')}>{t("homePage.about")}</button>
                    <button className={style.menu__button} onClick={() => handleRoutePath('./contacts')}>{t("homePage.contacts")}</button>
                    <button className={style.menu__button} onClick={() => handleRoutePath('./projects')}>{t("homePage.projects")}</button>
                    <button className={style.menu__button} onClick={() => handleRoutePath('./skills')}>{t("homePage.skills")}</button>
                </div>
            </main>
        </div>
    );
};

export default Home;
