import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect, useState } from 'react';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';
import axios from 'axios';

const Projects = () => {

    const [DataProjectsArray, setDataProjectsArray] = useState([]);
    const { i18n } = useTranslation();
    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        changeLanguage(DisplayButton);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4000/projects')
            .then((res) => {
                setDataProjectsArray(res.data);
            })
            .catch((err) => { console.log(`Error receiving data from the server: ${err}`) });
    }, []);

    return (
        <>
            <div className={style.projects}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
                <div className={style.projects__box}>
                    {DataProjectsArray.map((el, i) => {
                        return (
                            <div className={style.box__project} key={i}>
                                <div className={style.project__img}></div>
                                <div className={style.project__info}>
                                    <h5>{el.name}</h5>
                                    <h6>{el.info}</h6>
                                </div>
                            </div>
                        )
                    })}
                    <button className={style.box__adding_button}>+</button>
                </div>
            </div>
        </>
    );
};

export default Projects;