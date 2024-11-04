import { useTranslation } from 'react-i18next';
import BackButton from '../../Reused/BackButton/BackButton';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CertificateImg from '../../../images/certificate.png';
import CertificatePreviewImg from '../../../images/certificatePreview.png';

const About = () => {

    const { t, i18n } = useTranslation();
    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        changeLanguage(DisplayButton);
    }, []);

    return (
        <>
            <div className={style.about}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
                <div className={style.about__box}>
                    <h2>{t('aboutPage.hello')}</h2>
                    <h3>{t('aboutPage.miniInfo')}</h3>
                    <h4>{t('aboutPage.purpose')}</h4>
                </div>
                <figure>
                <LazyLoadImage className={style.about__img} src={CertificateImg} placeholderSrc={CertificatePreviewImg} alt='Certificate' title='Certificate image'/>
                    <figcaption>{t('aboutPage.certificate')}</figcaption>
                </figure>
            </div>
        </>
    );
};

export default About;