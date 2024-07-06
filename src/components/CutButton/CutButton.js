import { useContext } from 'react';
import { AppContext } from '../../context';
import { ReactComponent as Icon } from '../../images/svg/scissors.svg';
import CustomTooltip from '../CustomTooltip';
import s from './CutButton.module.scss';

const CutButton = () => {
    const { state, dispatch } = useContext(AppContext);

    const { error } = state;

    const handleShuffle = () => {
        dispatch({ type: 'TOGGLE_SHUFFLE' });
    };

    return (
        <CustomTooltip
            title={error ? 'Choose image' : 'Cut and shuffle'}
            placement="top">
            <span>
                <button className={s.Button}
                    type="button"
                    onClick={handleShuffle}
                    disabled={error} >
                    <Icon className={s.LogoImg} />
                </button>
            </span>
        </CustomTooltip>
    )
}

export default CutButton;