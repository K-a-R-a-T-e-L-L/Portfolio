export const handleValueInputFile = (e, setValueInputFile, setUrlFile, setOffset, elements, WidthWindow) => {
    const file = e.target.files[0];
    if (file) {
        setValueInputFile(file);
        const url = URL.createObjectURL(file);
        setUrlFile(url);
        if (elements.length > 1) {
            setOffset((elements.length) * -WidthWindow);
        }
        else { setOffset(-WidthWindow) };
    };
};

export const handleSlideSideways = (direction, WidthWindow, Offset, elements, setOffset) => {
    const sign = direction ? -WidthWindow : WidthWindow;
    if ((Offset < 0 && !direction) || (Offset > (elements.length - 1) * -WidthWindow) && direction) {
        setOffset((value) => value + sign);
    }
    else {
        { direction ? setOffset(0) : setOffset((elements.length - 1) * -WidthWindow) };
    };
};

export const handleDragOver = (e, setHoverLabel) => {
    e.preventDefault();
    setHoverLabel(true);
};

export const handleDragLeave = (e, setHoverLabel) => {
    e.preventDefault();
    setHoverLabel(false)
};

export const handleDrop = (e, setHoverLabel, setValueInputFile, setUrlFile, elements, setOffset, WidthWindow) => {
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
        else { setOffset(-WidthWindow) };
    };
};