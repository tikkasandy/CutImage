import Container from '../Container';
import s from './Footer.module.scss';

const Footer = () => (
    <footer className={s.Footer}>
        <Container>
            <p className={s.Text}> {'© 2024 Developed by '}
                <a
                    className={s.Link}
                    href="https://github.com/tikkasandy"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Github profile"
                    aria-label="Link to Github profile"
                >
                    tikkasandy
                </a>
            </p>
        </Container>
    </footer>
)

export default Footer;