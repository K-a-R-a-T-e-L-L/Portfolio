import { useEffect, useState } from 'react';
import ImgSlider from '../../Reused/ImgSlider/ImgSlider';
import style from './styles.module.scss';

const ChildAddProject = ({ setAddingNewProject }) => {

    const [ArrayElements, setArrayElements] = useState(['+']);
    const [ArrayFiles, setArrayFiles] = useState([]);

    const handleAddingElements = (url, file) => {
        setArrayElements((value) => [...value, url]);
        setArrayFiles((value) => [...value, file]);
    };

    const handleDeletingElement = (index) => {
        setArrayElements((value) => value.filter((_, i) => i !== index));
        setArrayFiles((value) => value.filter((_, i) => i !== index - 1));
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
                <input className={`${style.box_input__input} ${style.adding_project__input}`} type="text" placeholder='name ru' />
                <input className={`${style.box_input__input} ${style.adding_project__input}`} type="text" placeholder='name' />
            </div>
            <div className={style.adding_project__box_textareas}>
                <textarea className={style.box_textarea__textarea} name="" id="" placeholder='info ru'></textarea>
                <textarea className={style.box_textarea__textarea} name="" id="" placeholder='info'></textarea>
            </div>
            <input className={`${style.adding_project__input} ${style.adding_project__input_link}`} type="text" placeholder='Link' />
            <div className={style.adding_project__box_buttons}>
                <button className={style.box_buttons__button} onClick={() => { setAddingNewProject(false) }}>Отмена</button>
                <button className={style.box_buttons__button}>Сохранить</button>
            </div>
        </div>
    );
};

export default ChildAddProject;