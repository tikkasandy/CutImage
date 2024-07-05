import { useContext } from 'react';
import { AppContext } from '../../context';
import { Eye, EyeOff, Grid2x2Check, Grid2x2X, Printer } from 'lucide-react';
import CustomTooltip from '../CustomTooltip';
import s from './SettingsMenu.module.scss';



const SettingsMenu = () => {
    const { state, dispatch } = useContext(AppContext);
    const { imgVisibility, linesVisibility } = state;

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

    function handlePrint() {
        window.print()
    }

    return (
        <div className={s.SettingsMenu}>

            <CustomTooltip
                title={imgVisibility ? 'Hide picture' : 'Show picture'}
                placement="top">
                <button
                    type="button"
                    className={s.Button}
                    value="Print this page"
                    onClick={showImage}>
                    {imgVisibility
                        ? <Eye className={s.Svg} />
                        : <EyeOff className={s.Svg} />}
                </button>
            </CustomTooltip>

            <CustomTooltip
                title={linesVisibility ? 'Hide lines' : 'Show lines'}
                placement="top">
                <button
                    type="button"
                    className={s.Button}
                    value="Print this page"
                    onClick={showLines}>
                    {linesVisibility
                        ? <Grid2x2Check className={s.Svg} />
                        : <Grid2x2X className={s.Svg} />}
                </button>
            </CustomTooltip>

            <CustomTooltip title="Print" placement="top">
                <button
                    type="button"
                    className={s.Button}
                    value="Print this page"
                    onClick={handlePrint}>
                    <Printer className={s.Svg} />
                </button>
            </CustomTooltip>
        </div>
    )
}

export default SettingsMenu;