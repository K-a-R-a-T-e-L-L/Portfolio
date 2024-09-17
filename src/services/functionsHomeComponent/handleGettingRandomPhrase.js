import axios from "axios";
import { requestTextTranslation } from "./requestTextTranslation";

export const handleGettingRandomPhrase = async ({setTranslationError, setPhrase, setLoading, t}) => {
    setLoading(true);
    try {
        const res = await axios.get("https://api.quotable.io/random");
        await requestTextTranslation(`«${res.data.content}»`, 'en|ru')
            .then(translated => {
                if (translated !== 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT') {
                    setPhrase(translated);
                    setTranslationError(null);
                };
            })
            .catch((err) => {
                setTranslationError(' TRANSLATION ERROR');
                setPhrase(`«${res.data.content}»`);
                console.log(`Ошибка при переводе: ${err}`);
            });
    }
    catch (err) {
        try {
            const res = await axios.get("https://api.adviceslip.com/advice");
            await requestTextTranslation(`«${res.data.slip.advice}»`, 'en|ru')
                .then(translated => {
                    if (translated !== 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT') {
                        setPhrase(translated);
                        setTranslationError(null);
                    };
                })
                .catch((err) => {
                    setTranslationError(' TRANSLATION ERROR');
                    setPhrase(`«${res.data.slip.advice}»`);
                    console.log(`Ошибка при переводе: ${err}`);
                });
        }
        catch (err) {
            setTranslationError(null);
            setPhrase(t('phrase'));
            console.log(`Ошибка при получении случайно фразы: ${err}`);
        }
    }
    finally {
        setLoading(false)
    };    
};