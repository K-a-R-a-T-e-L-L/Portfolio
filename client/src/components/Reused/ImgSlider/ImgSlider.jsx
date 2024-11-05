import style from './styles.module.scss';
import { useEffect, useState } from 'react';
import { handleValueInputFile, handleSlideSideways, handleDragOver, handleDragLeave, handleDrop } from './sliderHandlers';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../../hooks/useLocalStorage/useLocalStorage';

const ImgSlider = ({ elements, handleAddingElements, handleDeletingElement }) => {

    const [WidthWindow, setWidthWindow] = useState(null);
    const [Offset, setOffset] = useState(elements.length > 2 ?
        (window.innerWidth < 900 ? (window.innerWidth < 400 ? -125 : (window.innerWidth < 700 ? -175 : -250)) : -350) : 0);
    const [CurrentIndex, setCurrentIndex] = useState(0);
    const [ValueInputFile, setValueInputFile] = useState(null);
    const [UrlFile, setUrlFile] = useState(null);
    const [HoverLabel, setHoverLabel] = useState(false);
    const { i18n, t } = useTranslation();
    const [DisplayButton, setDisplayButton] = useLocalStorage('page-language', 'ru');
    const URLServer = process.env.REACT_APP_URL_SERVER;

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setDisplayButton(language);
    };

    useEffect(() => {
        const handleWidthWindow = () => {
            setWidthWindow(window.innerWidth < 900 ? (window.innerWidth < 400 ? 125 : (window.innerWidth < 700 ? 175 : 250)) : 350);
        };
        handleWidthWindow();
        window.addEventListener('resize', handleWidthWindow);
        return () => {
            window.removeEventListener('resize', handleWidthWindow);
        };
    }, []);

    useEffect(() => {
        setOffset(elements.length > 2 ? (window.innerWidth < 900 ? (window.innerWidth < 400 ? -125 : (window.innerWidth < 700 ? -175 : -250)) : -350) : 0);
    }, [WidthWindow]);

    useEffect(() => {
        changeLanguage(DisplayButton);
    }, []);

    useEffect(() => {
        if (UrlFile) {
            handleAddingElements(UrlFile, ValueInputFile);
        }
    }, [UrlFile]);

    useEffect(() => {
        return () => {
            if (UrlFile) {
                URL.revokeObjectURL(UrlFile);
            }
        };
    }, [UrlFile]);

    useEffect(() => {
        setCurrentIndex(Math.abs(Offset) / WidthWindow);
    }, [Offset, WidthWindow]);

    return (
        <>
            <div className={style.slider}>
                <div className={style.slider__side} onClick={() => handleSlideSideways(false, WidthWindow, Offset, elements, setOffset)}>⟨</div>
                <div className={style.slider__window}>
                    {elements.map((el, i) => {
                        return (
                            <div
                                className={style.window__page}
                                key={i}
                                style={{
                                    transform: `translateX(${Offset}px) ${CurrentIndex !== i ? 'scale(0.80)' : ''}`,
                                    opacity: `${CurrentIndex !== i ? '0.5' : '1'}`,
                                    backgroundImage: `URL(${typeof el === 'object' ? `${URLServer}/${el.destination}/${el.filename}` : el})`,
                                    backgroundSize: 'cover',
                                    border: `1px ${typeof el === 'object' ? 'solid aqua' : 'dashed rgb(212, 0, 255)'}`,
                                    borderColor: `${HoverLabel ? 'aqua' : 'rgb(212, 0, 255)'}`
                                }}
                            >
                                {el === '+' ? (
                                    <>
                                        <label
                                            htmlFor="edding-img"
                                            onDragOver={(e) => handleDragOver(e, setHoverLabel)}
                                            onDragLeave={(e) => handleDragLeave(e, setHoverLabel)}
                                            onDrop={(e) => handleDrop(e, setHoverLabel, setValueInputFile, setUrlFile, elements, setOffset, WidthWindow)}
                                        >
                                            <input
                                                type="file"
                                                id='edding-img'
                                                onChange={(e) => handleValueInputFile(e, setValueInputFile, setUrlFile, setOffset, elements, WidthWindow)}
                                                accept="image/*"
                                            />
                                            <span>{t("slider.titleAdding")}</span>
                                        </label>
                                    </>
                                ) : (
                                    <>{elements.includes('+') && (
                                        <>
                                            <button
                                                className={style.page__button}
                                                onClick={() => {
                                                    handleDeletingElement(i);
                                                    setUrlFile(null);
                                                    setOffset((elements.length - 2) * -WidthWindow);
                                                }}
                                            >
                                            </button>
                                        </>
                                    )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className={style.slider__side} onClick={() => handleSlideSideways(true, WidthWindow, Offset, elements, setOffset)}>⟩</div>
            </div>
        </>
    );
};

export default ImgSlider;