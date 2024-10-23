import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';
import { useEffect, useState } from 'react';
import LanguageChangeButtons from '../../Reused/LanguageChangeButtons/LanguageChangeButtons';
import BackButton from '../../Reused/BackButton/BackButton';
import axios from 'axios';
import ChildMoreData from './ChildMoreData';
import ChildAddProject from './ChildAddProject';

const Projects = () => {

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
        axios.get('http://localhost:4000/projects')
            .then((res) => {
                const data = res.data.map(el => ({
                    ...el,
                    img: JSON.parse(el.img)
                }));
                setDataProjectsArray(data);
            })
            .catch((err) => { console.log(`Error receiving data from the server: ${err}`) });
    }, [AddingNewProject]);

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
                                                    style={{ backgroundImage: `URL(http://localhost:4000/${el.img[0].destination}/${el.img[0].filename})` }}
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