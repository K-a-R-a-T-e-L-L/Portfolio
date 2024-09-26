import { useTranslation } from 'react-i18next';
import BackButton from '../../Reused/BackButton/BackButton';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect } from 'react';
import CertificateImg from '../../../images/certificate.png';

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
                    <h2>{t('hello')}</h2>
                    <h3>{t('miniInfo')}</h3>
                    <h4>{t('purpose')}</h4>
                    <h5>{t('info')}</h5>
                </div>
                <figure>
                    <img src={CertificateImg} alt="Certificate" title='CertificateImg' />
                    <figcaption>{t('certificate')}</figcaption>
                </figure>
            </div>
        </>
    );
};

export default About;