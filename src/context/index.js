import { createContext, useEffect, useReducer } from 'react';

const initialState = {
    grid: {
        rows: 3,
        columns: 3,
    },
    imgSize: {
        width: 0,
        height: 0,
        originWidth: 0,
        originHeight: 0,
    },
    linesVisibility: true,
    imgVisibility: true,
    imgUrl: '',
    error: false,
    shuffle: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_GRID':
            return { ...state, grid: action.payload };
        case 'SET_IMG_SIZE':

            return { ...state, imgSize: action.payload };
        case 'SET_LINES_VISIBILITY':
            return { ...state, linesVisibility: action.payload };
        case 'SET_IMG_VISIBILITY':
            return { ...state, imgVisibility: action.payload };
        case 'SET_IMG_URL':
            return { ...state, imgUrl: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_SHUFFLE':
            return { ...state, shuffle: action.payload };
        default:
            return state;
    }
};

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const restoredState = JSON.parse(localStorage.getItem('kidDRAWgrid')) || initialState;
    const mergedState = { ...restoredState, shuffle: initialState.shuffle };

    const [state, dispatch] = useReducer(reducer, mergedState);

    useEffect(() => {
        const { shuffle, ...savedState } = state;
        localStorage.setItem('kidDRAWgrid', JSON.stringify(savedState));
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };