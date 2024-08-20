import { updateConditionField } from '@/app/helpers/actions';
import { Condition } from '@/app/types/workflowTypes';
import { AppDispatch } from '@/store';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface ButtonGroupProps {
    index: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ index }) => {
    const [selected, setSelected] = useState<'AND' | 'OR'>('AND');
    const dispatch = useDispatch<AppDispatch>();

    const cind = index + 1;

    const updateCondition = (index: number, updates: Partial<Condition>) => {
        dispatch(updateConditionField({
            index,
            field: updates
        }));
    };

    const selectAnd = (int: number) => {
        updateCondition(int, {
            conditionType: 'AND'
        });
        console.log('and selected' + int)
        setSelected('AND');
    }

    const selectOr = (int: number) => {
        updateCondition(int, {
            conditionType: 'OR'
        });
        console.log('or selected' + int)
        setSelected('OR');
    }

    return (
        <div className="relative flex w-44 h-[100px] mx-auto rounded-md overflow-hidden">
            <div
                className={`absolute inset-0 bg-black transition-transform duration-300 ease-in-out ${selected === 'AND' ? 'translate-x-0 rounded-l-md' : 'translate-x-full rounded-r-md'
                    }`}
                style={{ height: '40px', width: '50%', top: '30px' }}
            />
            <button
                onClick={() => selectAnd(cind)}
                className={`relative flex-1 px-3 py-1 text-white font-semibold ${selected === 'AND' ? 'bg-transparent rounded-l-md' : 'bg-transparent'} z-10`}
                style={{ borderRight: '1px solid #848694' }}
            >
                AND
            </button>
            <button
                onClick={() => selectOr(cind)}
                className={`relative flex-1 px-3 py-1 text-white font-semibold ${selected === 'OR' ? 'bg-transparent rounded-r-md' : 'bg-transparent'} z-10`}
            >
                OR
            </button>
        </div>
    );
};

export default ButtonGroup;
