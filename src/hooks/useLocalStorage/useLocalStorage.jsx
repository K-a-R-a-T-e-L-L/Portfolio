import { useEffect, useState } from "react";

export const useLocalStorage = (Key, DefaultValue) => {
    const [State, SetState] = useState(() => {
        let Value;

        try {
            Value = JSON.parse(window.localStorage.getItem(Key) || DefaultValue)
        }
        catch (e) {
            Value = DefaultValue
        }
        return Value
    })

    useEffect(() => {
        window.localStorage.setItem(Key, JSON.stringify(State))
    }, [State])

    return [State, SetState]
};