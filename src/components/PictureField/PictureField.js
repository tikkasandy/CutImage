import { useEffect, useRef, useState } from 'react';
import s from './PictureField.module.scss';

const PictureField = ({ state, imageUrl = 'https://deti-online.com/i/c/f5/5341/zoom/veselye-druzya-vinni-puh-i-pyatachok.jpg' }) => {
    const FIRST_LETTER = 65;

    const picRef = useRef(null);

    let size = state;
    const [lines, setLines] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [canvases, setCanvases] = useState([]);

    const [rowsNames, setRowsNames] = useState([1]);
    const [columnsNames, setColumnsNames] = useState(['A']);


    let WIDTH = 500;
    let HEIGHT = 500;

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

        generateCanvases();
        // // const canvas = canvasRef.current
        // // const ctx = canvas.getContext('2d')
        // // const img = picRef.current;
        // const { rows, columns } = size;
        // const pieceWidthP = naturalWidth / size.columns;
        // const pieceHeightP = naturalHeight / size.rows;

        // const scaleW = WIDTH / naturalWidth;
        // const scaleH = HEIGHT / naturalHeight;

        // // ctx.drawImage(img, 0, 0, img.width / rows, img.height / columns, 0, 0, canvas.width, canvas.height);
        // // console.log(ctx)
        // // setSize(JSON.parse(window.localStorage.getItem('size')));

        // // const pieceWidth = WIDTH / rows;
        // // const pieceHeight = HEIGHT / columns;
        // const newPieces = [];

        // for (let row = 0; row < rows; row++) {
        //     for (let col = 0; col < columns; col++) {
        //         console.log('in block',)
        //         newPieces.push({
        //             row,
        //             col,
        //             // backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
        //             backgroundPosition: `-${col * pieceWidthP}px -${row * pieceHeightP}px`,
        //             label: `${String.fromCharCode(col + FIRST_LETTER)}${row + 1}`,
        //             width: pieceWidthP,
        //             height: pieceHeightP,
        //             scaleW,
        //             scaleH,
        //         });
        //     }
        // }

        // console.log('width', naturalWidth, 'height', naturalHeight);
        // console.log('pieceWidth', pieceWidth, 'pieceHeight', pieceHeight);
        // console.log('pieceWidthP', pieceWidthP, 'pieceHeightP', pieceHeightP);
        // console.log('scale', scaleW, scaleH);

        // console.log(newPieces)

        // setPieces(newPieces);
        // // setPieces(shuffleArray(newPieces));
    };

    const generateCanvases = () => {
        const img = picRef.current;
        const pieceWidth = img.offsetWidth / size.columns;
        const pieceHeight = img.offsetHeight / size.rows;

        const newCanvases = [];
        for (let row = 0; row < size.rows; row++) {
            for (let col = 0; col < size.columns; col++) {
                const canvas = document.createElement('canvas');
                canvas.width = pieceWidth;
                canvas.height = pieceHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(
                    img,
                    col * pieceWidth,
                    row * pieceHeight,
                    pieceWidth,
                    pieceHeight,
                    0,
                    0,
                    pieceWidth,
                    pieceHeight
                );
                newCanvases.push(canvas);
            }
        }

        setCanvases(shuffleArray(newCanvases));
    }

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
                    <img classname={s.Pic} src={imageUrl} alt='cutting' ref={picRef} crossOrigin='anonymous' />
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

            <div className={`${s.Img} ${s.Grid}`}
                style={{ width: { WIDTH }, height: { HEIGHT }, gridTemplateColumns: `repeat(${state.columns}, auto)` }}>
                {pieces.map((piece, index) => (
                    <div
                        className={s.PieceBlock}
                        key={index}
                        style={{
                            // width: pieceWidth,
                            // height: pieceHeight + 52,
                            backgroundSize: 'contain',
                            objectFit: 'contain',
                            // height: piece.height
                        }}
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
                                // backgroundSize: 'contain',
                                // transform: `scale(${piece.scaleW}, ${piece.scaleH})`,
                            }}>

                        </div>
                    </div>


                ))}
            </div>

            {/* <canvas ref={canvasRef} width={500} height={500}></canvas> */}
            <div className={`${s.Img} ${s.Grid}`} style={{ gridTemplateColumns: `repeat(${size.columns}, 1fr)` }}>
                {canvases.map((canvas, index) => (
                    <div
                        key={index}
                        className={s.ImagePiece}
                        style={{
                            width: canvas.width,
                            height: canvas.height,
                        }}
                    >
                        {canvas ? <img src={canvas.toDataURL()} alt={`piece-${index}`} /> : null}
                    </div>
                ))}
            </div>

        </>
    )
}

export default PictureField;

// import React, { useState, useEffect } from 'react';
// import s from './PictureField.module.scss';
// import pic from './Piglet07.jpg';

// const PictureField = ({ imageUrl = 'src/components/PictureField/PictureField.js', numRowsToCut = 5, numColsToCut = 10 }) => {
//     const [pieces, setPieces] = useState([]);
//     const [imageLoaded, setImageLoaded] = useState(false);
//     const pieceWidth = 500 / numColsToCut;
//     const pieceHeight = 500 / numRowsToCut;

//     useEffect(() => {
//         const image = new Image();
//         image.onload = () => {
//             cutImageUp(image);
//             setImageLoaded(true);
//         };
//         image.src = imageUrl;
//     }, [imageUrl]);

//     const cutImageUp = (image) => {
//         const imagePieces = [];
//         for (let x = 0; x < numColsToCut; ++x) {
//             for (let y = 0; y < numRowsToCut; ++y) {
//                 const canvas = document.createElement('canvas');
//                 canvas.width = pieceWidth;
//                 canvas.height = pieceHeight;
//                 const context = canvas.getContext('2d');
//                 context.drawImage(
//                     image,
//                     x * pieceWidth,
//                     y * pieceHeight,
//                     pieceWidth,
//                     pieceHeight,
//                     0,
//                     0,
//                     canvas.width,
//                     canvas.height
//                 );
//                 imagePieces.push({
//                     src: canvas.toDataURL(),
//                     x,
//                     y,
//                 });
//             }
//         }
//         setPieces(imagePieces);
//     };

//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//         return array;
//     };

//     const shufflePieces = () => {
//         setPieces((prevPieces) => shuffleArray([...prevPieces]));
//     };

//     return (
//         <div>
//             <div className={s.Picture} style={{ width: 500, height: 500, position: 'relative' }}>
//                 {/* {imageLoaded &&
//                     pieces.map((piece, index) => (
//                         <img
//                             key={index}
//                             src={piece.src}
//                             alt={`Piece ${index}`}
//                             style={{
//                                 width: pieceWidth,
//                                 height: pieceHeight,
//                                 position: 'absolute',
//                                 top: piece.y * pieceHeight,
//                                 left: piece.x * pieceWidth,
//                             }}
//                         />
//                     ))} */}
//                 <img src={pic} width="100%" height="100%" alt="" />
//             </div>
//             <button className={s.Button} type="button" onClick={shufflePieces}>
//                 Shuffle Pieces
//             </button>
//         </div>
//     );
// };

// export default PictureField;
