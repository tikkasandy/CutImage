import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context';
import { Frown } from 'lucide-react';
import { FIRST_LETTER_CODE } from '../../constants/common';
import s from './OriginalImg.module.scss';

const OriginalImg = () => {
    const { state, dispatch } = useContext(AppContext);

    const { grid, imgVisibility, linesVisibility, imgUrl, imgSize, error } = state;
    const { rows, columns } = grid;
    const { width, height } = imgSize;

    const picRef = useRef(null);

    const [lines, setLines] = useState([]);
    // const [error, setError] = useState(true);


    const [rowsNames, setRowsNames] = useState([]);
    const [columnsNames, setColumnsNames] = useState([]);


    const onLoad = (e) => {
        dispatch({ type: 'SET_ERROR', payload: false });
        // setError(false);
        console.log('onLoad', picRef.current.offsetWidth, picRef.current.offsetHeight, picRef.current.naturalWidth, picRef.current.naturalHeight,);
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
        console.log('Error', e)
    }

    useEffect(() => {
        console.log('Change sizes');

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
        console.log('Change!!!!!');


        const drawLines = () => {
            const newLines = [];
            const newRowsNames = [1];
            const newColNames = ['A'];

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
                if (!(i % 2)) newColNames.push(String.fromCharCode(i / 2 + FIRST_LETTER_CODE));
            }

            setLines(newLines);
            setRowsNames(newRowsNames);
            setColumnsNames(newColNames);
        }

        drawLines();
    }, [columns, rows])

    return (
        <div className={s.Original}>
            <h2 className={s.Title}>Original image</h2>
            <div className={s.ImgGrid}>
                <div className={s.ImgColumns}
                // style={{ width: `${width}px` }}
                >
                    {columnsNames.map((colLabel, index) => (
                        <div
                            className={s.ColumnsNames}
                            key={index}
                        >{colLabel}</div>
                    ))}
                </div>

                <div className={s.ImgRow}
                // style={{ height: `${height}px` }}
                >
                    {rowsNames.map((rowLabel, index) => (
                        <div className={s.RowsNames}
                            key={index}
                        >{rowLabel}</div>
                    ))}</div>

                <div className={`${s.Img} ${s.Sasha}`}>
                    <img
                        src={imgUrl}
                        alt='cutting'
                        ref={picRef}
                        onLoad={onLoad}
                        onError={onError}
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
                    {error && <div className={s.Error}
                    // style={{ width: '100%', height: `${height}px` }}
                    >
                        <p className={s.ErrorMessage}>Image not found</p>
                        <Frown className={s.Smile}></Frown>
                        <p className={s.ErrorMessage}>Please enter correct Url</p>
                    </div>}
                </div>

            </div>
            <p className={s.BreakPage}>&nbsp;</p>
        </div>
    )
}

export default OriginalImg;
