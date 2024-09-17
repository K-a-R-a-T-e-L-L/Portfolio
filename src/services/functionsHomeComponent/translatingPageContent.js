import { requestTextTranslation } from "./requestTextTranslation";

export const translatingPageContent = async ({setTranslationError, setPhrase, setLoading, DisplayButton, Phrase}) => {
    setLoading(true);
    const Language = DisplayButton === 'en' ? 'ru' : 'en'
    await requestTextTranslation(Phrase, `${Language}|${DisplayButton}`)
        .then(translated => {
            if (translated !== 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT') {
                setPhrase(translated);
                setLoading(false);
                setTranslationError(null);
            };
        })
        .catch((err) => {
            setTranslationError(' TRANSLATION ERROR');
            setPhrase((value) => value);
            console.log(`Ошибка при переводе: ${err}`);
            setLoading(false);
        });
};