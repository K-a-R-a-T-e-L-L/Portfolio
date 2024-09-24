import { useTranslation } from 'react-i18next';
import style from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const BackButton = ({pathBack}) => {

    const Navigate = useNavigate();
    const { t } = useTranslation();

    const handleRoutePath = (path) => {
        Navigate(path);
    };

    return (
        <>
            <button onClick={() => handleRoutePath(pathBack)} className={style.back}>{t("backButton")}</button>
        </>
    );
};

export default BackButton;