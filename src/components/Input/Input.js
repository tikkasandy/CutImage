import { Minus, Plus } from 'lucide-react';
import s from './Input.module.scss';

const Input = ({ name, type, min, max, value, onChange, onDecrease, onIncrease }) => {
    return (
        <div className={s.Wrapper}>
            <button
                type='button'
                className={`${s.Button} ${s.Decrease}`}
                disabled={value <= min}
                onClick={() => onDecrease(name)}>
                <Minus className={s.Svg} />
            </button>

            <button
                type='button'
                className={`${s.Button} ${s.Increase}`}
                disabled={value >= max}
                onClick={() => onIncrease(name)}>
                <Plus className={s.Svg} />
            </button>

            <input
                className={s.Input}
                onChange={onChange}
                value={value}
                type={type}
                name={name}
                min={min}
                max={max}
                step='1'
                placeholder=''
                aria-label={name}
                id={name}
            />
        </div >
    )
}

export default Input;