import { createContext, useEffect, useReducer } from "react";

const initialState = {
    grid: {
        rows: 1,
        columns: 1,
    },
    imgSize: {
        width: 500,
        height: 500,
        originWidth: 500,
        originHeight: 500,
    },
    linesVisibility: false,
    imgVisibility: true,
    imgUrl: '',
    error: false,
    shuffle: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_GRID':
            return { ...state, grid: action.payload };
        case 'SET_IMG_SIZE':
            console.log('dispatch SET_IMG_SIZE', action.payload)
            return { ...state, imgSize: action.payload };
        case 'SET_LINES_VISIBILITY':
            return { ...state, linesVisibility: action.payload };
        case 'SET_IMG_VISIBILITY':
            return { ...state, imgVisibility: action.payload };
        case 'SET_IMG_URL':
            return { ...state, imgUrl: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'TOGGLE_SHUFFLE':
            return { ...state, shuffle: !state.shuffle };
        default:
            return state;
    }
};

const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const savedState = JSON.parse(localStorage.getItem('cutImageState')) || initialState;

    const [state, dispatch] = useReducer(reducer, savedState);

    useEffect(() => {
        localStorage.setItem('cutImageState', JSON.stringify(state));
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };