import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';

const LanguageChangeButtons = ({ DisplayButton, setDisplayButton, left }) => {

    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    return (
        <>
            <div className={style.box_buttons} style={{ left: left }}>
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
        </>
    );
};

export default LanguageChangeButtons;