import SetSize from '../SetSize';
import SetImage from '../SetImage';
import ViewOptions from '../ViewOptions';
import s from './SettingsBar.module.scss';

const SettingsBar = () => {
    return (
        <div className={s.SettingsBar}>
            <SetSize />
            <SetImage />
            <ViewOptions />
        </div>
    )
}

export default SettingsBar;