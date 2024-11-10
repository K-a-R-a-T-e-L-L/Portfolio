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
                    <div className={style.box__text}>
                        <h1 className={style.text__title}>{t('aboutPage.hello')}</h1>
                        <p className={style.text__info}>{t('aboutPage.miniInfo')}</p>
                        <h2 className={style.text__goal}>{t('aboutPage.purpose')}</h2>
                    </div>
                    <div className={style.about__certificate}>
                        <figure>
                            <LazyLoadImage
                                src={CertificateImg}
                                placeholderSrc={CertificatePreviewImg}
                                alt="Сертификат о прохождении курса"
                                className={style.certificateImg}
                            />
                            <figcaption>{t('aboutPage.certificate')}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;