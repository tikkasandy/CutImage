import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import { PiRowsBold } from 'react-icons/pi';
import { PiColumnsBold } from 'react-icons/pi';
import CustomTooltip from '../CustomTooltip';
import Input from '../Input';
import s from './SetSize.module.scss';


const SetSize = () => {
    const { state, dispatch } = useContext(AppContext);


    const [rows, setRows] = useState(state.grid.rows);
    const [columns, setColumns] = useState(state.grid.columns);

    const INPUT_MAX = 26;
    const INPUT_MIN = 1;

    useEffect(() => {
        dispatch({
            type: 'SET_GRID',
            payload: {
                rows,
                columns,
            },
        });

        dispatch({
            type: 'SET_SHUFFLE',
            payload: true,
        });
    }, [rows, columns, dispatch]);

    const handleRowsChange = (e) => {
        const { value } = e.target;

        if (value > INPUT_MAX) {
            setRows(INPUT_MAX);
        } else if (value < INPUT_MIN) {
            setRows(INPUT_MIN);
        } else {
            setRows(+value);
        }
    };

    const handleColumnsChange = (e) => {
        const { value } = e.target;

        if (value > INPUT_MAX) {
            setColumns(INPUT_MAX);
        } else if (value < INPUT_MIN) {
            setColumns(INPUT_MIN);
        } else {
            setColumns(+value);
        }
    };

    const onDecrease = name => {
        if (name === 'rows') {
            setRows(prev => Math.max(INPUT_MIN, prev - 1));
        }

        if (name === 'columns') {
            setColumns(prev => Math.max(INPUT_MIN, prev - 1));
        }
    };

    const onIncrease = name => {
        if (name === 'rows') {
            setRows(prev => Math.min(INPUT_MAX, prev + 1));
        }

        if (name === 'columns') {
            setColumns(prev => Math.min(INPUT_MAX, prev + 1));
        }
    };

    return (
        <div className={s.Section}>
            <form className={s.Form}>
                <CustomTooltip
                    title='Number of rows'
                    placement='top'>

                    <div className={s.Input}>
                        <label className={s.Label} htmlFor='rows'>
                            {/* <p className={s.Text}>rows</p> */}
                            <PiRowsBold className={s.Svg} />
                        </label>
                        <Input
                            onChange={handleRowsChange}
                            onDecrease={() => onDecrease('rows')}
                            onIncrease={() => onIncrease('rows')}
                            value={rows}
                            type='number'
                            name='rows'
                            min={INPUT_MIN}
                            max={INPUT_MAX}
                        />
                    </div>
                </CustomTooltip>

                <CustomTooltip
                    title='Number of columns'
                    placement='top'>
                    <div className={s.Input}>
                        <label className={s.Label} htmlFor='columns'>
                            <PiColumnsBold className={s.Svg} />
                            {/* <p className={s.Text}>columns</p> */}
                        </label>
                        <Input
                            onChange={handleColumnsChange}
                            onDecrease={() => onDecrease('columns')}
                            onIncrease={() => onIncrease('columns')}
                            value={columns}
                            type='number'
                            name='columns'
                            min={INPUT_MIN}
                            max={INPUT_MAX}
                        />
                    </div>
                </CustomTooltip>
            </form>
        </div>
    );
};

export default SetSize;
