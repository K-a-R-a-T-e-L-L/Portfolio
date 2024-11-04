import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect, useState } from 'react';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';
import axios from 'axios';
import ChildMoreData from './ChildMoreData/ChildMoreData';
import ChildAddProject from './ChildAddProject/ChildAddProject';

const Projects = () => {

    const URLProjects = process.env.REACT_APP_URL_PROJECTS;
    const URLServer = process.env.REACT_APP_URL_SERVER;    

    const [DataProjectsArray, setDataProjectsArray] = useState([]);
    const [MoreDataProject, setMoreDataProject] = useState();
    const [AddingNewProject, setAddingNewProject] = useState(false);
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
        axios.get(`${URLProjects}`)
            .then((res) => {
                const data = res.data.map(el => ({
                    ...el,
                    img: JSON.parse(el.img)
                }));
                setDataProjectsArray(data);
            })
            .catch((err) => {
                const ErrorMessage = err.response ?
                    `Ошибка на серевере ${JSON.stringify(err.response.data)}` : err.request ? `Ответ от сервера не был получен` : `Произошла ошибка ${err.message}`
                console.log(ErrorMessage);
            });
    }, [AddingNewProject, MoreDataProject]);

    return (
        <>
            <div className={style.projects}>
                <LanguageChangeButtons DisplayButton={DisplayButton} setDisplayButton={setDisplayButton} left={'30px'} />
                <BackButton pathBack={'/'} />
                <div className={style.projects__box}>
                    {!MoreDataProject ? (
                        <>
                            {!AddingNewProject ? (
                                <>
                                    {DataProjectsArray.map((el, i) => {
                                        return (
                                            <div className={style.box__project} key={i} onClick={() => { setMoreDataProject(el) }}>
                                                <div
                                                    className={style.project__img}
                                                    style={{ backgroundImage: `URL(${URLServer}/${el.img[0].destination}/${el.img[0].filename})` }}
                                                >
                                                </div>
                                                <div className={style.project__info}>
                                                    <h5>{DisplayButton === 'en' ? el.name : el.name_ru}</h5>
                                                    <h6>{DisplayButton === 'en' ? el.info : el.info_ru}</h6>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <button className={style.box__adding_button} onClick={() => setAddingNewProject(true)}>+</button>
                                </>
                            ) : (
                                <><ChildAddProject setAddingNewProject={setAddingNewProject} /></>
                            )}
                        </>
                    ) : (
                        <>
                            <ChildMoreData DisplayButton={DisplayButton} MoreDataProject={MoreDataProject} setMoreDataProject={setMoreDataProject} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;