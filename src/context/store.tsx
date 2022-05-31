import React, {Dispatch, useReducer} from "react";
import {Actions, initialState, State, reducer} from "./reducer";

interface ContextProps {
    state: State;
    dispatch: Dispatch<Actions>;
}

export const Store = React.createContext({} as ContextProps);

export function StoreProvider(props: any) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = {state, dispatch};
    return (<Store.Provider value={value}>{props.children}</Store.Provider>);
}
