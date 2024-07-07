import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { PiLinkSimpleBold } from 'react-icons/pi';
import CustomTooltip from '../CustomTooltip';
import s from './SetImage.module.scss';


const SetImage = () => {
    const { state, dispatch } = useContext(AppContext);
    const [url, setUrl] = useState(state.imgUrl);

    useEffect(() => {
        dispatch({
            type: 'SET_IMG_URL',
            payload: url,
        });

        dispatch({
            type: 'SET_SHUFFLE',
            payload: true,
        });
    }, [url, dispatch]);

    const handleChangeUrl = ({ target }) => {
        const { value } = target;

        setUrl(value);
    }

    return (
        <CustomTooltip
            title='Image URL'
            placement='top'>
            <div className={s.Section}>
                <label className={s.Label} htmlFor='picture'>
                    <PiLinkSimpleBold className={s.Svg} />
                </label>
                <div className={s.Url}>
                    <input
                        value={url}
                        className={s.Input}
                        onChange={handleChangeUrl}
                        type='url'
                        name='picture'
                        id='picture'
                    />
                </div>
            </div>
        </CustomTooltip>
    );
}

export default SetImage;
