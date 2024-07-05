import React, { useContext, useEffect, useState } from 'react';
import s from './ShuffledPieces.module.scss';
import { AppContext } from '../../context';

const ShuffledPieces = () => {
    const FIRST_LETTER = 65;
    const { state, dispatch } = useContext(AppContext);

    const { grid, imgSize, shuffle } = state;
    const { rows, columns } = grid;
    const { width, height, originWidth } = imgSize;

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
    }, [shuffle, columns, rows, width, height]);

    return (
        <div className={s.Cutted}>
            <h2 className={s.Title}>Cutted image</h2>
            <div className={`${s.CuttedImg}`}
            // style={{ width, gridTemplateColumns: `repeat(${columns}, auto)` }}>
            // style={{ width }}
            >

                {pieces.map((piece, index) => (
                    <div className={s.PieceBlock} key={index}>
                        <div className={s.ImagePieceLabel}>
                            {piece.label}
                        </div>
                        <div className={s.ImagePiece}
                            style={{
                                width: piece.width,
                                height: piece.height,
                                backgroundImage: `url(${state.imgUrl})`,
                                backgroundPosition: piece.backgroundPosition,
                                top: piece.row * piece.height,
                                left: piece.col * piece.width,
                                backgroundSize: piece.backgroundSize,
                            }}>
                            <div className={s.LinesM}
                                style={{ width: piece.width, height: piece.height }}>
                                <div className={s.VertLine}></div>
                                <div className={s.HorLine}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShuffledPieces;
