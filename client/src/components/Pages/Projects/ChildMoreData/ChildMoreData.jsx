import axios from 'axios';
import ImgSlider from '../../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../../../hooks/useLocalStorage/useLocalStorage';

const ChildMoreData = ({ DisplayButton, MoreDataProject, setMoreDataProject }) => {

    const URLDeletingProject = process.env.REACT_APP_URL_DELETING_PROJECT

    const [DeleteProject, setDeleteProject] = useState(false);
    const [ValueInputOne, setValueInputOne] = useState('');
    const [ValueInputTwo, setValueInputTwo] = useState('');
    const { t } = useTranslation();

    const handleValueInputs = (e, set) => {
        set(e.target.value);
    };

    const handleDeleteProject = () => {
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

    return (
        <div className={style.projects__more_data}>
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
                <>
                    <h4 className={style.more_data__delete_project}>{t("projectsPage.more.deletingBlock.title")}</h4>
                    <h6 className={style.more_data__confirmation_deletion}>{t("projectsPage.more.deletingBlock.info")}</h6>
                    <div className={style.more_data__box_inputs}>
                        <input
                            className={style.box_inputs__input}
                            type="text" placeholder='XXXXXXXXXXXXXXXX'
                            value={ValueInputOne}
                            onChange={(e) => handleValueInputs(e, setValueInputOne)}
                        />
                        <input
                            className={style.box_inputs__input}
                            type="password" placeholder='XXXXXXXXXXXXXXXX'
                            value={ValueInputTwo}
                            onChange={(e) => handleValueInputs(e, setValueInputTwo)}
                        />
                    </div>
                    <div className={style.more_data__box_buttons}>
                        <button className={style.box_buttons__button} onClick={() => setDeleteProject(false)}>{t("projectsPage.more.deletingBlock.cancel")}</button>
                        <button className={style.box_buttons__button} onClick={handleDeleteProject}>{t("projectsPage.more.deletingBlock.delete")}</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChildMoreData;