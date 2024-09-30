import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useEffect } from 'react';
import { SkillsArray } from './index';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import NoImage from '../../../images/noImg.png'

const Skills = () => {

    const { i18n } = useTranslation();
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
            <div className={style.skills}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'}/>
                <div className={style.skills__box}>
                    {SkillsArray.map((el, i) => {
                        return (
                            <div className={style.box__skill} key={i}>
                                <LazyLoadImage className={style.skill__logo} alt='Image logo' src={el.logo} placeholderSrc={NoImage} />
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