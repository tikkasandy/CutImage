import { useEffect, useRef, useState } from 'react';
import s from './PictureField.module.scss';

const PictureField = ({ state, imageUrl = 'https://rozmalyovky.com.ua/wp-content/uploads/wwq_220.jpg' }) => {
    const FIRST_LETTER = 65;

    const picRef = useRef(null);

    let size = state;
    const [lines, setLines] = useState([]);
    const [pieces, setPieces] = useState([]);

    const [rowsNames, setRowsNames] = useState([1]);
    const [columnsNames, setColumnsNames] = useState(['A']);


    let WIDTH;
    let HEIGHT;

    let naturalWidth;
    let naturalHeight;

    useEffect(() => {
        WIDTH = picRef.current.offsetWidth;
        HEIGHT = picRef.current.offsetHeight;

        naturalHeight = picRef.current.naturalHeight;
        naturalWidth = picRef.current.naturalWidth;

        console.log(picRef.current.naturalWidth, picRef.current.naturalHeight)
    }, [picRef]);

    const pieceWidth = WIDTH / size.columns;
    const pieceHeight = HEIGHT / size.rows;

    const drawLines = () => {
        const { rows, columns } = size;
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
            if (!(i % 2)) newColNames.push(String.fromCharCode(i / 2 + FIRST_LETTER));
        }

        setLines(newLines);
        setRowsNames(newRowsNames);
        setColumnsNames(newColNames);
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffle = () => {
        const { rows, columns } = size;
        const pieceWidthP = WIDTH / size.columns;
        const pieceHeightP = HEIGHT / size.rows;

        const scaleW = WIDTH / naturalWidth;
        const scaleH = HEIGHT / naturalHeight;

        console.log('WIDTH', WIDTH, 'HEIGHT', HEIGHT)

        const newPieces = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                console.log('in block',)
                newPieces.push({
                    row,
                    col,
                    backgroundPosition: `-${col * pieceWidthP}px -${row * pieceHeightP}px`,
                    label: `${String.fromCharCode(col + FIRST_LETTER)}${row + 1}`,
                    width: pieceWidthP,
                    height: pieceHeightP,
                    backgroundSize: `${WIDTH}px ${HEIGHT}px`
                });
            }
        }

        console.log('width', naturalWidth, 'height', naturalHeight);
        console.log('pieceWidth', pieceWidth, 'pieceHeight', pieceHeight);
        console.log('pieceWidthP', pieceWidthP, 'pieceHeightP', pieceHeightP);
        console.log('scale', scaleW, scaleH);

        console.log(newPieces)

        setPieces(shuffleArray(newPieces));
    };

    return (
        <>
            <button className={s.Button}
                type="button"
                onClick={drawLines}>
                Draw lines
            </button>

            <button
                className={s.Button}
                type="button"
                onClick={shuffle}>
                Shuffle
            </button>

            <div className={s.ImgGrid}>
                <div className={s.ImgCol}>
                    {columnsNames.map((colLabel, index) => (
                        <div
                            className={s.ColumnsNames}
                            key={index}
                        >{colLabel}</div>
                    ))}
                </div>

                <div className={s.ImgRow}>
                    {rowsNames.map((rowLabel, index) => (
                        <div className={s.RowsNames}
                            key={index}
                        >{rowLabel}</div>
                    ))}</div>

                <div className={`${s.Img} ${s.Sasha}`}>
                    <img src={imageUrl} alt='cutting' ref={picRef} />
                    {lines.map((line, index) => (
                        <div
                            key={index}
                            className={`${s.GridLine} ${line.orientation === 'horizontal' ? s.Horizontal : s.Vertical} ${line.type === 'main' ? s.Main : s.Secondary}`}
                            style={line.orientation === 'horizontal' ? { top: line.position } : { left: line.position }}
                        ></div>
                    ))}
                </div>
            </div>

            <p className={s.BreakPage}>&nbsp;</p>

            <div className={`${s.CuttedImg}`}
                style={{ width: { WIDTH }, height: { HEIGHT }, gridTemplateColumns: `repeat(${state.columns}, auto)` }}>
                {pieces.map((piece, index) => (
                    <div
                        className={s.PieceBlock}
                        key={index}
                    >
                        <div className={s.ImagePieceLabel}>
                            {piece.label}
                        </div>
                        <div className={s.ImagePiece}
                            style={{
                                width: piece.width,
                                height: piece.height,
                                backgroundImage: `url(${imageUrl})`,
                                backgroundPosition: piece.backgroundPosition,
                                top: piece.row * piece.height,
                                left: piece.col * piece.width,
                                backgroundSize: piece.backgroundSize,
                            }}>
                            <div className={s.LinesM}
                                style={{
                                    width: piece.width,
                                    height: piece.height
                                }}>
                                <div
                                    className={s.VertLine}
                                ></div>
                                <div
                                    className={s.HorLine}
                                ></div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PictureField;
