import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect, useState } from 'react';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';
import axios from 'axios';
import ImgSlider from '../../Reused/ImgSlider/ImgSlider';

const Projects = () => {

    const [DataProjectsArray, setDataProjectsArray] = useState([]);
    const [MoreDataProject, setMoreDataProject] = useState();
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
                    {!MoreDataProject ? (
                        <>
                            {DataProjectsArray.map((el, i) => {
                                return (
                                    <div className={style.box__project} key={i} onClick={() => { setMoreDataProject(el) }}>
                                        <div className={style.project__img}></div>
                                        <div className={style.project__info}>
                                            <h5>{DisplayButton === 'en' ? el.name : el.name_ru}</h5>
                                            <h6>{DisplayButton === 'en' ? el.info : el.info_ru}</h6>
                                        </div>
                                    </div>
                                )
                            })}
                            <button className={style.box__adding_button}>+</button>
                        </>
                    ) : (
                        <>
                            <div className={style.projects__more_data}>
                                <button className={style.more_data__close} onClick={() => { setMoreDataProject() }}>✕</button>
                                <h3>{DisplayButton === 'en' ? MoreDataProject.name : MoreDataProject.name_ru}</h3>
                                <ImgSlider elements={[1,2,3,4]}/>
                                <p>{DisplayButton === 'en' ? MoreDataProject.info : MoreDataProject.info_ru}</p>
                                <span>Ссылка на проект:&ensp;<a href={MoreDataProject.link} target="_blank" rel="noopener noreferrer">{MoreDataProject.link}</a></span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;