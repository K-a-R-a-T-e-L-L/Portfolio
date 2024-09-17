import axios from "axios";

export async function requestTextTranslation(text, targetLang) {
    const res = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
            q: text,
            langpair: targetLang,
        }
    });

    return res.data.responseData.translatedText;
};