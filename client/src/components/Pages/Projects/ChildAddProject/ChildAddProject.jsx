import { useEffect, useState } from 'react';
import ImgSlider from '../../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';
import axios from 'axios';
import { useLocalStorage } from '../../../../hooks/useLocalStorage/useLocalStorage';
import { useTranslation } from 'react-i18next';

const ChildAddProject = ({ setAddingNewProject }) => {

    const URLAddingProject = process.env.REACT_APP_URL_ADDING_PROJECT;

    const [ArrayElements, setArrayElements] = useState(['+']);
    const [ArrayFiles, setArrayFiles] = useState([]);
    const [ValueNameInput, setValueNameInput] = useState("");
    const [ValueNameRuInput, setValueNameRuInput] = useState("");
    const [ValueInfoTextarea, setValueInfoTextarea] = useState("");
    const [ValueInfoRuTextarea, setValueInfoRuTextarea] = useState("");
    const [ValueLinkInput, setValueLinkInput] = useState("");
    const [Valid, setValid] = useState(false);
    const { i18n, t } = useTranslation();
    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    const handleAddingElements = (url, file) => {
        setArrayElements((value) => [...value, url]);
        setArrayFiles((value) => [...value, file]);
    };

    const handleDeletingElement = (index) => {
        setArrayElements((value) => value.filter((_, i) => i !== index));
        setArrayFiles((value) => value.filter((_, i) => i !== index - 1));
    };

    const handleValue = (e, set) => {
        set(e.target.value);
    };

    const handleSendingData = () => {
        if (ArrayFiles.length > 0 && ValueInfoRuTextarea !== '' && ValueInfoTextarea !== '' && ValueLinkInput !== '' && ValueNameInput !== '' && ValueNameRuInput !== '') {
            const data = new FormData();
            data.append('name', ValueNameInput);
            data.append('name_ru', ValueNameRuInput);
            data.append('link', ValueLinkInput);
            ArrayFiles.forEach((el) => {
                data.append('img', el);
            });
            data.append('info', ValueInfoTextarea);
            data.append('info_ru', ValueInfoRuTextarea);
            setValid(false);

            axios.post(`${URLAddingProject}`, data)
                .then((res) => {
                    setAddingNewProject(false)
                })
                .catch((err) => {
                    const ErrorMessage = err.response ?
                        `Ошибка на серевере ${JSON.stringify(err.response.data)}` : err.request ? `Ответ от сервера не был получен` : `Произошла ошибка ${err.message}`
                    console.log(ErrorMessage);
                });
        }
        else {
            setValid(!Valid);
        };
    };

    useEffect(() => {
        changeLanguage(DisplayButton);
    }, []);

    return (
        <div className={style.projects__adding_project}>
            {Valid && (
                <><div className={style.adding_project__message_error}>Добавьте файл и заполните все поля!!!</div></>
            )}
            <ImgSlider
                elements={ArrayElements}
                handleAddingElements={handleAddingElements}
                handleDeletingElement={handleDeletingElement}
            />
            <div className={style.adding_project__box_inputs}>
                <input
                    value={ValueNameRuInput}
                    onChange={(e) => handleValue(e, setValueNameRuInput)}
                    className={style.adding_project__input}
                    type="text"
                    placeholder={t("projectsPage.adding.nameRu")}
                />
                <input
                    value={ValueNameInput}
                    onChange={(e) => handleValue(e, setValueNameInput)}
                    className={style.adding_project__input}
                    type="text"
                    placeholder={t("projectsPage.adding.nameEn")}
                />
            </div>
            <div className={style.adding_project__box_textareas}>
                <textarea
                    value={ValueInfoRuTextarea}
                    onChange={(e) => handleValue(e, setValueInfoRuTextarea)}
                    className={style.box_textarea__textarea}
                    name=""
                    id=""
                    placeholder={t("projectsPage.adding.infoRu")}
                ></textarea>
                <textarea
                    value={ValueInfoTextarea}
                    onChange={(e) => handleValue(e, setValueInfoTextarea)}
                    className={style.box_textarea__textarea}
                    name=""
                    id=""
                    placeholder={t("projectsPage.adding.infoEn")}
                ></textarea>
            </div>
            <input
                value={ValueLinkInput}
                onChange={(e) => handleValue(e, setValueLinkInput)}
                className={`${style.adding_project__input} ${style.adding_project__input_link}`}
                type="text"
                placeholder={t("projectsPage.adding.link")}
            />
            <div className={style.adding_project__box_buttons}>
                <button className={style.box_buttons__button} onClick={() => { setAddingNewProject(false) }}>{t("projectsPage.adding.cancel")}</button>
                <button className={style.box_buttons__button} onClick={handleSendingData} style={Valid ? { borderColor: 'rgba(255, 0, 0, 0.521)' } : null}>
                    {t("projectsPage.adding.save")}
                </button>
            </div>
        </div>
    );
};

export default ChildAddProject;