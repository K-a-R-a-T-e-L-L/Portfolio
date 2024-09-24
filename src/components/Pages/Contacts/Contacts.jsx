import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import BackButton from '../../Reused/BackButton/BackButton';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import style from './styles.module.scss';
import { useEffect } from 'react';
import { ImgLogo } from './index';

const Contacts = () => {

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
            <div className={style.contacts}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
                <div className={style.contacts__box}>
                    <h5>{t("contact")}</h5>
                    <div>
                        <a href="https://t.me/K_a_R_a_T_e_L_L" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.tg} alt="Logo" />
                            Telegram
                        </a>
                        <a href="https://wa.me/qr/TULX5ES7DG5HA1" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.whatsapp} alt="Logo" />
                            WhatsApp
                        </a>
                        <a href="https://discord.gg/q89xXKSg" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.discord} alt="Logo" />
                            Discord
                        </a>
                        <a href="https://vk.com/jotop" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.vk} alt="Logo" />
                            VKontakte
                        </a>
                        <a href="https://github.com/K-a-R-a-T-e-L-L" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.gh} alt="Logo" />
                            GitHub
                        </a>
                        <a href="mailto:kirillcuhorukov6@gmail.com" target="_blank" rel="noopener noreferrer">
                            <img src={ImgLogo.gmail} alt="Logo" />
                            Gmail
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;