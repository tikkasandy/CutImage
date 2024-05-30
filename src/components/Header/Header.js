import Container from "../Container";
import { Printer } from 'lucide-react';
import s from './Header.module.scss';

const Header = () => {
    function handlePrint() {
        window.print()
    }
    return (
        <header className={s.Header}>
            <Container>
                <h1 className={s.Title}>Cut the image</h1>

                <button
                    type="button"
                    className={s.Button}
                    value="Print this page"
                    onClick={handlePrint}>
                    <Printer className={s.Printer} />
                </button>
            </Container>
        </header>
    )
}

export default Header;