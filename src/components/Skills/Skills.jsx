import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SkillsArray } from './index';

const Skills = () => {

    const { t, i18n } = useTranslation();
    const [DisplayButton, setDisplayButton] = useState('ru');

    const Navigate = useNavigate();

    const handleRoutePath = (path) => {
        Navigate(path);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        changeLanguage('ru');
    }, []);

    return (
        <>
            <div className={style.skills}>
                <div className={style.skills__box_buttons}>
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
                <button onClick={() => handleRoutePath('/')} className={style.skills__back}>{t("backButt")}</button>
                <div className={style.skills__box}>
                    {SkillsArray.map((el, i) => {
                        return(
                            <div className={style.box__skill} key={i}>
                                <div className={style.skill__logo} style={{backgroundImage: `URL(${el.logo})`}}></div>
                                <h4 className={style.skill__text}>{el.skill}</h4>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Skills;