import axios from 'axios';
import ImgSlider from '../../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChildDeleteProject from './ChildDeleteProject/ChildDeleteProject';

const ChildMoreData = ({ DisplayButton, MoreDataProject, setMoreDataProject }) => {

    const URLDeletingProject = process.env.REACT_APP_URL_DELETING_PROJECT

    const [DeleteProject, setDeleteProject] = useState(false);
    const [ValueInputOne, setValueInputOne] = useState('');
    const [ValueInputTwo, setValueInputTwo] = useState('');
    const [WidthWindow, setWidthWindow] = useState(null);
    const { t } = useTranslation();

    const handleValueInputs = (e, set) => {
        set(e.target.value);
    };

    const handleDeleteProject = (e) => {
        e.preventDefault();
        const data = { idProject: DeleteProject, oneValue: ValueInputOne, twoValue: ValueInputTwo };
        axios.post(`${URLDeletingProject}`, data)
            .then((res) => {
                if (res.data === true) {
                    setMoreDataProject();
                    setDeleteProject(false);
                }
            })
            .catch((err) => {
                const ErrorMessage = err.response ?
                    `Ошибка на серевере ${JSON.stringify(err.response.data)}` : err.request ? `Ответ от сервера не был получен` : `Произошла ошибка ${err.message}`
                console.log(ErrorMessage);
            });
    };

    useEffect(() => {
        window.addEventListener('resize', () => {setWidthWindow(window.innerWidth)});
        return () => {
            window.removeEventListener('resize', () => {setWidthWindow(window.innerWidth)});
        };
    }, []);

    useEffect(() => {
        setWidthWindow(window.innerWidth);
    }, []);

    return (
        <div className={style.projects__more_data} style={DeleteProject && WidthWindow < 700 ? {maxHeight: '400px'} : null}>
            <button className={style.more_data__close} onClick={() => { setMoreDataProject() }}>✕</button>
            {!DeleteProject ? (
                <>
                    <h3 className={style.more_data__name}>{DisplayButton === 'en' ? MoreDataProject.name : MoreDataProject.name_ru}</h3>
                    <ImgSlider elements={MoreDataProject.img} />
                    <p className={style.more_data__info}>{DisplayButton === 'en' ? MoreDataProject.info : MoreDataProject.info_ru}</p>
                    <span className={style.more_data__link}>
                        {t("projectsPage.more.titleLink")}&ensp;<a href={MoreDataProject.link} target="_blank" rel="noopener noreferrer">{MoreDataProject.link}</a>
                    </span>
                    <button className={style.more_data__delete} onClick={() => setDeleteProject(MoreDataProject.id)}></button>
                </>
            ) : (
                <ChildDeleteProject
                    ValueInputOne={ValueInputOne}
                    ValueInputTwo={ValueInputTwo}
                    setValueInputOne={setValueInputOne}
                    setValueInputTwo={setValueInputTwo}
                    handleValueInputs={handleValueInputs}
                    handleDeleteProject={handleDeleteProject}
                    setDeleteProject={setDeleteProject}
                />
            )}
        </div>
    );
};

export default ChildMoreData;