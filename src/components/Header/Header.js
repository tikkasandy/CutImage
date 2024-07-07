import Container from '../Container';
import SettingsBar from '../SettingsBar';
import { ReactComponent as Icon } from '../../images/svg/scissors.svg';
import s from './Header.module.scss';


const Header = () => (
    <header className={s.Header}>
        <Container>
            <div className={s.Wrapper}>
                <div className={s.Logo}>
                    <Icon className={s.LogoImg} />
                    <h1 className={s.Title}>kid<strong>draw</strong>grid</h1>
                </div>
                <div className={s.Settings}>
                    <SettingsBar />
                </div>
            </div>

        </Container>
    </header>
)

export default Header;