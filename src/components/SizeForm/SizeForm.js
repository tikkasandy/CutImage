import { useState } from 'react';
import Input from '../Input';
import s from './SizeForm.module.scss';

const SizeForm = ({ changeSize }) => {
    const [size, setSize] = useState(JSON.parse(window.localStorage.getItem('size')));

    const INPUT_MAX = 26;
    const INPUT_MIN = 1;

    const handleSubmit = evt => {
        evt.preventDefault();

        changeSize(size);
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;

        if (value > INPUT_MAX) {
            setSize(prevState => ({ ...prevState, [name]: INPUT_MAX }));
        } else if (value < INPUT_MIN) {
            setSize(prevState => ({ ...prevState, [name]: INPUT_MIN }));
        } else {
            setSize(prevState => ({ ...prevState, [name]: +value }));
        }
    }

    const onDecrease = name => {
        setSize(prevState => ({ ...prevState, [name]: +prevState[name] - 1 }));
    }

    const onIncrease = name => {
        setSize(prevState => ({ ...prevState, [name]: +prevState[name] + 1 }));
    }

    return (
        <div className={s.Section}>
            <h2 className={s.Title}>Select number of</h2>
            <form className={s.Form} onSubmit={handleSubmit}>
                <div className={s.Input}>
                    <label className={s.Label} htmlFor="rows">
                        <p className={s.Text}>rows</p>
                    </label>
                    <Input
                        onChange={handleChange}
                        onDecrease={onDecrease}
                        onIncrease={onIncrease}
                        value={size.rows}
                        type="number"
                        name="rows"
                        min={INPUT_MIN}
                        max={INPUT_MAX}
                    />
                </div>

                <div className={s.Input}>
                    <label className={s.Label} htmlFor="columns">
                        <p className={s.Text}>columns</p>
                    </label>
                    <Input
                        onChange={handleChange}
                        onDecrease={onDecrease}
                        onIncrease={onIncrease}
                        value={size.columns}
                        type="number"
                        name="columns"
                        min={INPUT_MIN}
                        max={INPUT_MAX}
                    />
                </div>

                <button className={s.Button} type="submit">Apply</button>

            </form>
        </div>
    )
}

export default SizeForm;