import { useEffect, useState } from 'react';
import ImgSlider from '../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';
import axios from 'axios';

const ChildAddProject = ({ setAddingNewProject }) => {

    const [ArrayElements, setArrayElements] = useState(['+']);
    const [ArrayFiles, setArrayFiles] = useState([]);
    const [ValueNameInput, setValueNameInput] = useState("");
    const [ValueNameRuInput, setValueNameRuInput] = useState("");
    const [ValueInfoTextarea, setValueInfoTextarea] = useState("");
    const [ValueInfoRuTextarea, setValueInfoRuTextarea] = useState("");
    const [ValueLinkInput, setValueLinkInput] = useState("");

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
        console.log(ArrayFiles);

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

            axios.post('http://localhost:4000/adding', data)
                .then((res) => {
                    console.log(res.data);
                    setAddingNewProject(false)
                })
                .catch((err) => console.log(err));
        }
        else {
            alert('Заполните все поля')
        }
    };

    useEffect(() => {
        console.log(ArrayFiles);
        console.log(ArrayElements);
    }, [ArrayElements, ArrayFiles])

    return (
        <div className={style.projects__adding_project}>
            <ImgSlider
                elements={ArrayElements}
                handleAddingElements={handleAddingElements}
                handleDeletingElement={handleDeletingElement}
            />
            <div className={style.adding_project__box_inputs}>
                <input
                    value={ValueNameRuInput}
                    onChange={(e) => handleValue(e, setValueNameRuInput)}
                    className={`${style.box_input__input} ${style.adding_project__input}`}
                    type="text"
                    placeholder='Russian name'
                />
                <input
                    value={ValueNameInput}
                    onChange={(e) => handleValue(e, setValueNameInput)}
                    className={`${style.box_input__input} ${style.adding_project__input}`}
                    type="text"
                    placeholder='English name'
                />
            </div>
            <div className={style.adding_project__box_textareas}>
                <textarea
                    value={ValueInfoRuTextarea}
                    onChange={(e) => handleValue(e, setValueInfoRuTextarea)}
                    className={style.box_textarea__textarea}
                    name=""
                    id=""
                    placeholder='Information in Russian'
                ></textarea>
                <textarea
                    value={ValueInfoTextarea}
                    onChange={(e) => handleValue(e, setValueInfoTextarea)}
                    className={style.box_textarea__textarea}
                    name=""
                    id=""
                    placeholder='Information in English'
                ></textarea>
            </div>
            <input
                value={ValueLinkInput}
                onChange={(e) => handleValue(e, setValueLinkInput)}
                className={`${style.adding_project__input} ${style.adding_project__input_link}`}
                type="text"
                placeholder='Link'
            />
            <div className={style.adding_project__box_buttons}>
                <button className={style.box_buttons__button} onClick={() => { setAddingNewProject(false) }}>Отмена</button>
                <button className={style.box_buttons__button} onClick={handleSendingData}>Сохранить</button>
            </div>
        </div>
    );
};

export default ChildAddProject;