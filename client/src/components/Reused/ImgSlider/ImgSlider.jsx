import style from './styles.module.scss';
import { useEffect, useState } from 'react';

const ImgSlider = ({ elements }) => {

    const WidthWindow = 350;
    const [Offset, setOffset] = useState(elements.length > 2 ? -350 : 0);
    const [CurrentIndex, setCurrentIndex] = useState(0);

    const handleLeft = () => {
        if (Offset < 0) {
            setOffset((value) => value + WidthWindow)
        }
        else if (elements.length > 3) {
            setOffset((elements.length - 2) * -WidthWindow)
        }
        else {
            setOffset((elements.length - 1) * -WidthWindow)
        };
    };

    const handleRight = () => {
        if (Offset > (elements.length - 1) * -WidthWindow) {
            setOffset((value) => value - WidthWindow);
        }
        else if (elements.length > 3) {
            setOffset(-350)
        }
        else {
            setOffset(0)
        };
    };

    useEffect(() => {
        setCurrentIndex(Math.abs(Offset) / WidthWindow);
    }, [Offset]);

    return (
        <>
            <div className={style.slider}>
                <div className={style.slider__side} onClick={handleLeft}>⟨</div>
                <div className={style.slider__window}>
                    {elements.map((el, i) => {
                        return (
                            <div className={style.window__page} key={i} style={{ transform: `translateX(${Offset}px) ${CurrentIndex !== i ? 'scale(0.85)' : ''}` }}>
                                {el}
                            </div>
                        )
                    })}
                </div>
                <div className={style.slider__side} onClick={handleRight}>⟩</div>
            </div>
        </>
    );
};

export default ImgSlider;