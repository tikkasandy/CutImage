import { useContext } from 'react';
import { AppContext } from '../../context';
import { Eye, EyeOff, Grid2x2Check, Grid2x2X, Shuffle, Printer } from 'lucide-react';
import CustomTooltip from '../CustomTooltip';
import s from './ViewOptions.module.scss';



const ViewOptions = () => {
    const { state, dispatch } = useContext(AppContext);

    const { imgVisibility, linesVisibility } = state;
    const { error, imgUrl } = state;

    const showImage = () => {
        dispatch({
            type: 'SET_IMG_VISIBILITY',
            payload: !imgVisibility,
        });
    };

    const showLines = () => {
        dispatch({
            type: 'SET_LINES_VISIBILITY',
            payload: !linesVisibility,
        });
    };

    const shufflePieces = () => {
        dispatch({
            type: 'SET_SHUFFLE',
            payload: true,
        });
    };

    function handlePrint() {
        window.print()
    }

    return (
        <div className={s.ViewOptions}>

            <CustomTooltip
                title={imgVisibility ? 'Hide original' : 'Show original'}
                placement='top'
            >
                <button
                    className={s.Button}
                    onClick={showImage}
                    type='button'
                    value={imgVisibility ? 'Hide original' : 'Show original'}
                    disabled={error || !imgUrl.trim()}
                >
                    {imgVisibility
                        ? <Eye className={s.Svg} />
                        : <EyeOff className={s.Svg} />}
                </button>
            </CustomTooltip>

            <CustomTooltip
                title={linesVisibility ? 'Hide lines' : 'Show lines'}
                placement='top'
            >
                <button
                    className={s.Button}
                    onClick={showLines}
                    type='button'
                    value={linesVisibility ? 'Hide lines' : 'Show lines'}
                    disabled={error || !imgUrl.trim()}
                >
                    {linesVisibility
                        ? <Grid2x2Check className={s.Svg} />
                        : <Grid2x2X className={s.Svg} />}
                </button>
            </CustomTooltip>


            <CustomTooltip
                title='Shuffle'
                placement='top'
            >
                <button
                    className={s.Button}
                    onClick={shufflePieces}
                    type='button'
                    value='Shuffle pieces'
                    disabled={error || !imgUrl.trim()}
                >
                    <Shuffle className={s.Svg} />
                </button>
            </CustomTooltip>

            <CustomTooltip
                title='Print'
                placement='top'
            >
                <button
                    className={s.Button}
                    onClick={handlePrint}
                    type='button'
                    value='Print this pages'
                    disabled={error || !imgUrl.trim()}
                >
                    <Printer className={s.Svg} />
                </button>
            </CustomTooltip>
        </div>
    )
}

export default ViewOptions;