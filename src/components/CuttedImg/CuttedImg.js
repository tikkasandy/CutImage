import React, { useContext, useEffect, useState } from 'react';
import s from './CuttedImg.module.scss';
import { AppContext } from '../../context';

const CuttedImg = () => {
    const FIRST_LETTER = 65;
    const { state, dispatch } = useContext(AppContext);

    const { grid, imgSize, shuffle } = state;
    const { rows, columns } = grid;
    const { width, height, } = imgSize;

    const [pieces, setPieces] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (shuffle) {
            const pieceWidthP = width / columns;
            const pieceHeightP = height / rows;

            const newPieces = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < columns; col++) {
                    newPieces.push({
                        row,
                        col,
                        backgroundPosition: `-${col * pieceWidthP}px -${row * pieceHeightP}px`,
                        label: `${String.fromCharCode(col + FIRST_LETTER)}${row + 1}`,
                        width: pieceWidthP,
                        height: pieceHeightP,
                        backgroundSize: `${width}px ${height}px`
                    });
                }
            }

            setPieces(shuffleArray(newPieces));
            dispatch({ type: 'TOGGLE_SHUFFLE' });
        }
    }, [dispatch, shuffle, columns, rows, width, height]);

    return (
        <div className={s.Cutted}>
            <h2 className={s.Title}>Cutted image</h2>
            <div className={s.Wrapper}>
                {pieces.map((piece, index) => (
                    <div
                        key={index}
                        className={s.Piece}
                        style={{ width: piece.width }}
                    >
                        <div className={s.Label}>
                            {piece.label}
                        </div>

                        <div className={s.Image}
                            style={{
                                width: piece.width,
                                height: piece.height,
                                top: piece.row * piece.height,
                                left: piece.col * piece.width,
                                backgroundImage: `url(${state.imgUrl})`,
                                backgroundSize: piece.backgroundSize,
                                backgroundPosition: piece.backgroundPosition,
                            }}>

                            <div className={s.Lines}
                                style={{ width: piece.width, height: piece.height }}>
                                <div className={s.Horizontal}></div>
                                <div className={s.Vertical}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CuttedImg;
