import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context';
import { Frown } from 'lucide-react';
import { CONSTANTS } from '../../utils/constants';
import s from './OriginalImg.module.scss';

const OriginalImg = () => {
    const { state, dispatch } = useContext(AppContext);

    const { grid, imgVisibility, linesVisibility, imgUrl, imgSize, error } = state;
    const { rows, columns } = grid;
    const { width, height } = imgSize;

    const picRef = useRef(null);

    const [lines, setLines] = useState([]);
    const [rowsNames, setRowsNames] = useState([]);
    const [columnsNames, setColumnsNames] = useState([]);


    const onLoad = (e) => {
        dispatch({ type: 'SET_ERROR', payload: false });

        dispatch({
            type: 'SET_IMG_SIZE',
            payload: {
                width: picRef.current.offsetWidth,
                height: picRef.current.offsetHeight,
                originWidth: picRef.current.naturalWidth,
                originHeight: picRef.current.naturalHeight,
            },
        });
    }

    const onError = (e) => {
        dispatch({ type: 'SET_ERROR', payload: true });
    }

    useEffect(() => {
        if (!error && picRef.current) {
            dispatch({
                type: 'SET_IMG_SIZE',
                payload: {
                    width: picRef.current.offsetWidth,
                    height: picRef.current.offsetHeight,
                    originWidth: picRef.current.naturalWidth,
                    originHeight: picRef.current.naturalHeight,
                },
            });
        }

    }, [picRef, error, dispatch])


    useEffect(() => {
        const drawLines = () => {
            const newLines = [];
            const newRowsNames = [CONSTANTS.FIRST_ROW_NAME];
            const newColumnsNames = [CONSTANTS.FIRST_COLUMN_NAME];

            for (let i = 1; i <= 2 * rows - 1; i++) {
                newLines.push({
                    orientation: 'horizontal',
                    type: i % 2 ? 'secondary' : 'main',
                    position: `${(i * 100) / (2 * rows)}%`
                });

                if (!(i % 2)) newRowsNames.push(i / 2 + 1);
            }

            for (let i = 1; i <= 2 * columns - 1; i++) {
                newLines.push({
                    orientation: 'vertical',
                    type: i % 2 ? 'secondary' : 'main',
                    position: `${(i * 100) / (2 * columns)}%`
                });
                if (!(i % 2)) newColumnsNames.push(String.fromCharCode(i / 2 + CONSTANTS.FIRST_LETTER_CODE));
            }

            setLines(newLines);
            setRowsNames(newRowsNames);
            setColumnsNames(newColumnsNames);
        }

        drawLines();
    }, [columns, rows])

    return (
        <div className={s.Original}>
            <h2 className={s.Title}>Original image</h2>
            {imgUrl.trim() &&
                <div className={s.Grid}>
                    <div className={s.Columns}>
                        {columnsNames.map((colLabel, index) => (
                            <div
                                className={s.ColumnName}
                                key={index}
                            >{colLabel}</div>
                        ))}
                    </div>

                    <div className={s.Rows}>
                        {rowsNames.map((rowLabel, index) => (
                            <div className={s.RowName}
                                key={index}
                            >{rowLabel}</div>
                        ))}</div>

                    <div className={s.Image}>
                        <img
                            onLoad={onLoad}
                            onError={onError}
                            src={imgUrl}
                            alt='Original'
                            ref={picRef}
                            style={{ opacity: imgVisibility ? 1 : 0, display: `${error ? 'none' : 'block'}` }}
                            hidden={error} />

                        {lines.map((line, index) => (
                            <div
                                key={index}
                                className={`${s.GridLine} ${line.orientation === 'horizontal' ? s.Horizontal : s.Vertical} ${line.type === 'main' ? s.Main : s.Secondary}`}
                                style={line.orientation === 'horizontal' ? { top: line.position } : { left: line.position }}
                                hidden={!linesVisibility}
                            ></div>
                        ))}

                        {error &&
                            <div
                                className={s.Error}
                                style={{ height, width }}
                            >
                                <p className={s.ErrorMessage}>Image not found</p>
                                <Frown className={s.Smile}></Frown>
                                <p className={s.ErrorMessage}>Please enter correct Url</p>
                            </div>}
                    </div>

                </div>}
        </div>
    )
}

export default OriginalImg;