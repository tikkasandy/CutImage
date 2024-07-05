import SetSize from '../SetSize';
import SetImage from '../SetImage';
import SettingsMenu from '../SettingsMenu';
import CutButton from '../CutButton';
import s from './SettingsBar.module.scss';

const SettingsBar = () => {
    return (
        <div className={s.SettingsBar}>
            <SetSize />
            <SetImage />
            <SettingsMenu />
            <CutButton />
        </div>
    )
}

export default SettingsBar;