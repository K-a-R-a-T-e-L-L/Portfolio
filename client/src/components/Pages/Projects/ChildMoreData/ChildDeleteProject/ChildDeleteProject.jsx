import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';

const ChildDeleteProject = ({ ValueInputOne, ValueInputTwo, setValueInputOne, setValueInputTwo, handleValueInputs, handleDeleteProject, setDeleteProject }) => {

    const { t } = useTranslation();

    return (
        <>
            <form>
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
                        autoComplete='off'
                        value={ValueInputTwo}
                        onChange={(e) => handleValueInputs(e, setValueInputTwo)}
                    />
                </div>
                <div className={style.more_data__box_buttons}>
                    <button className={style.box_buttons__button} onClick={() => setDeleteProject(false)}>{t("projectsPage.more.deletingBlock.cancel")}</button>
                    <button className={style.box_buttons__button} onClick={handleDeleteProject}>{t("projectsPage.more.deletingBlock.delete")}</button>
                </div>
            </form>
        </>
    );
};

export default ChildDeleteProject;