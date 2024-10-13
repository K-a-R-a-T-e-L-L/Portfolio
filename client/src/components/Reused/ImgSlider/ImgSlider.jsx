import style from './styles.module.scss';
import { useEffect, useState } from 'react';

const ImgSlider = ({ elements, handleAddingElements, handleDeletingElement }) => {

    const WidthWindow = 350;
    const [Offset, setOffset] = useState(elements.length > 2 ? -350 : 0);
    const [CurrentIndex, setCurrentIndex] = useState(0);
    const [ValueInputFile, setValueInputFile] = useState(null);
    const [UrlFile, setUrlFile] = useState(null);

    const handleValueInputFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValueInputFile(file);
            const url = URL.createObjectURL(file);
            setUrlFile(url);
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
                                }}
                            >
                                {el === '+' ? (
                                    <>
                                        <label htmlFor="edding-img">
                                            <input type="file" id='edding-img' onChange={handleValueInputFile} />
                                            <span>Нажмите чтобы добавить или перетащите в это поле</span>
                                        </label>
                                    </>
                                ) : (
                                    <>{elements.includes('+') ? (
                                        <>
                                            <button className={style.page__button} onClick={() => { handleDeletingElement(i); setUrlFile(null) }}>del</button>
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