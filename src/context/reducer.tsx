type PhotoBookMarc = {
    width: string
    height: string
}

type VideoBookMarc = {
    duration: number
    upload_date: string
}

export interface BookMarc extends VideoBookMarc, PhotoBookMarc {
    html: string
    id: string
    url: string
    title: string
    author_name: string
    addedDate: number
}

export interface State {
    bookMarcs: BookMarc[];
}

interface Add {
    type: "ADD";
    payload: BookMarc
}

interface Remove {
    type: "REMOVE";
    payload: { id: string }
}

export type Actions = Add | Remove;

export const initialState: State = {
    bookMarcs: [],
};

export function reducer(state: State, action: Actions) {
    const {type, payload} = action;

    switch (type) {
        case 'ADD':
            return {...state, bookMarcs: [...state.bookMarcs, payload]};
        case 'REMOVE':
            const {id} = payload
            const bookMarcs = state.bookMarcs.filter((bookMarc) => bookMarc.id !== id)

            return {...state, bookMarcs};
        default:
            return state;
    }
}
