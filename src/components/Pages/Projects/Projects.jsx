import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect } from 'react';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';

const Projects = () => {


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
            <div className={style.projects}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
                <div className={style.projects__box}>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                    <div className={style.box__project}>
                        <div className={style.project__img}></div>
                        <div className={style.project__info}>
                            <h5>NAME</h5>
                            <h6>info</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;