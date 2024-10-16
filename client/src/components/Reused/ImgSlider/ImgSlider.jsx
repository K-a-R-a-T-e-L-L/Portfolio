import style from './styles.module.scss';
import { useEffect, useState } from 'react';

const ImgSlider = ({ elements, handleAddingElements, handleDeletingElement}) => {

    const WidthWindow = 350;
    const [Offset, setOffset] = useState(elements.length > 2 ? -350 : 0);
    const [CurrentIndex, setCurrentIndex] = useState(0);
    const [ValueInputFile, setValueInputFile] = useState(null);
    const [UrlFile, setUrlFile] = useState(null);
    const [HoverLabel, setHoverLabel] = useState(false);

    const handleValueInputFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValueInputFile(file);
            const url = URL.createObjectURL(file);
            setUrlFile(url);
            if (elements.length > 1) {
                setOffset((elements.length) * -WidthWindow);
            }
            else { setOffset(-350) };
        };
    };

    const handleSlideSideways = (direction) => {
        const sign = direction ? -WidthWindow : WidthWindow;
        if ((Offset < 0 && !direction) || (Offset > (elements.length - 1) * -WidthWindow) && direction) {
            setOffset((value) => value + sign);
        }
        else {
            { direction ? setOffset(0) : setOffset((elements.length - 1) * -WidthWindow) };
        };
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setHoverLabel(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setHoverLabel(false)
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setHoverLabel(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setValueInputFile(file);
            const url = URL.createObjectURL(file);
            setUrlFile(url);
            if (elements.length > 1) {
                setOffset((elements.length) * -WidthWindow);
            }
            else { setOffset(-350) };
        };
    };

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
    }, [Offset]);

    return (
        <>
            <div className={style.slider}>
                <div className={style.slider__side} onClick={() => handleSlideSideways(false)}>⟨</div>
                <div className={style.slider__window}>
                    {elements.map((el, i) => {
                        return (
                            <div
                                className={style.window__page}
                                key={i}
                                style={{
                                    transform: `translateX(${Offset}px) ${CurrentIndex !== i ? 'scale(0.85)' : ''}`,
                                    opacity: `${CurrentIndex !== i ? '0.5' : '1'}`,
                                    backgroundImage: `URL(${el})`,
                                    backgroundSize: 'cover',
                                    borderColor: `${HoverLabel ? 'aqua' : 'rgb(212, 0, 255)'}`
                                }}
                            >
                                {el === '+' ? (
                                    <>
                                        <label htmlFor="edding-img" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                            <input type="file" id='edding-img' onChange={handleValueInputFile} accept="image/*" />
                                            <span>Нажмите или перетащите чтобы добавить изображение</span>
                                        </label>
                                    </>
                                ) : (
                                    <>{elements.includes('+') ? (
                                        <>
                                            <button
                                                className={style.page__button}
                                                onClick={() => {
                                                    handleDeletingElement(i);
                                                    setUrlFile(null); 
                                                    setOffset((elements.length - 2) * -WidthWindow);
                                                }}
                                            >
                                                del
                                            </button>
                                            <button className={style.page__button}>edit</button>
                                        </>
                                    ) : (
                                        <>{el}</>
                                    )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className={style.slider__side} onClick={() => handleSlideSideways(true)}>⟩</div>
            </div>
        </>
    );
};

export default ImgSlider;