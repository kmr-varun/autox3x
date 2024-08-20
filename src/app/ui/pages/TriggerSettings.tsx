import React, { useState } from 'react';
import { AddFilled, CloseFilled, Save } from '@carbon/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import ConditionDropdown from '../components/Dropdowns/ConditionDropdown';
import OperatorDropdown from '../components/Dropdowns/OperatorDropdown';
import PropertyDropdown from '../components/Dropdowns/PropertyDropdown';
import IconButton from '../components/Buttons/IconButton';
import ButtonGroup from '../components/Buttons/ButtonGroup';
import { addCondition, removeCondition } from '@/app/slices/workflowSlice';
import { Condition } from '@/app/types/workflowTypes';
import { setSetupCondition } from '@/app/slices/setupSlice';
import { Pipeline } from '@/app/types/inputType';
import { selectConditions, selectWorkflow } from '@/app/helpers/selectors';
import IntervalSetting from './TimeBound/DateArrives';
import DateArrives from './TimeBound/DateArrives';
import TimeInterval from './TimeBound/TimeInterval';
import DatePassed from './TimeBound/DatePassed';

interface TriggerSettingsProps {
  dropdownOptions: Pipeline[];
  handleSelect: (selectedOption: string) => void;
}

const TriggerSettings: React.FC<TriggerSettingsProps> = ({ dropdownOptions, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const workflow = useSelector(selectWorkflow);
  const conditions = useSelector(selectConditions);

  const setCondition = (cond: boolean) => {
    dispatch(setSetupCondition(cond));
  };

  const handleAddCondition = () => {
    const newCondition: Condition = {
      columnId: '',
      columnName: '',
      columnType: '',
      fromValue: '',
      toValue: '',
      multi: false,
      operatorString: '',
      operator: '',
      conditionType: 'AND'
    };
    dispatch(addCondition(newCondition));
    setIsOpen(true);
  };



  const getUniqueValuesById = (id: string, pipelines: Pipeline[]): any[] | null => {
    if (!Array.isArray(pipelines)) {
      throw new TypeError('Pipelines should be an array');
    }

    for (const pipeline of pipelines) {
      if (pipeline && Array.isArray(pipeline.entity)) {
        const entity = pipeline.entity.find(e => e.id === id);
        if (entity) {
          return entity.uniqueValues;
        }
      }
    }
    return null;
  };

  return (
    <div className='noscroll p-8 w-full h-[700px] overflow-y-scroll'>
      <div>
        <div className='text-xl text-[#848694] my-4'>Trigger Settings</div>
        <div>
        {
          conditions.length > 0 ? conditions.map((condition: Condition, index) => (
            <div>{condition.columnName +  ' ' + condition.operatorString +  (condition.fromValue != '' ?  condition.fromValue : ' from '
              
            )  +  ' to ' + condition.toValue}</div>
          )) : (
            <div></div>
          )
        }
        </div>
        <div className='text-3xl text-white my-2'>
          {/* When a Status changes from <span className='text-[#4E4E58]'>something</span> to <span className='text-[#4E4E58]'>something</span> */}
          { workflow.workflowString != '' ?  workflow.workflowString : 'Setup A Trigger' }
        </div>
        <div className='text-[#848694] text-[15px]'>The trigger will fire when a {workflow.name}</div>

        <div className='my-2 p-2'>
          {workflow.workflowType == 'datearrives' &&
            <DateArrives />
          }
          {
            workflow.workflowType == 'timeinterval' &&
            <TimeInterval />
          }
          {
            workflow.workflowType == 'datepassed' &&
            <DatePassed />
          }

        </div>

        {isOpen &&
          <div>
            {conditions.length > 0 ? conditions.map((condition, index) => (
              <div key={index} >
                <div className='border border-[#848694] p-4 rounded-lg'>
                  <div className='flex my-2 flex-row justify-between'>
                    <div className='text-white my-2 text-base'>Conditions</div>
                    <button className='p-2'>
                      <CloseFilled className='w-6 h-6 text-[#848694]' onClick={() => { dispatch(removeCondition(index)) }} />
                    </button>
                  </div>
                  <div className='flex gap-4 items-center '>
                    <div className='py-3 px-6 bg-[#35363A] rounded-xl w-32 text-center'>Where</div>
                    <ConditionDropdown
                      title={condition.columnName || 'Column'}
                      options={dropdownOptions}
                      condindex={index}
                    />
                    {conditions.length > 0 &&
                      <OperatorDropdown title={condition.operatorString || 'Operator'} datatype={conditions[conditions.length - 1].columnType || 'Oper'} condindex={index} />
                    }
                  </div>
                  {conditions.length > 0 && (
                    <div className='pt-8 mx-4'>
                      {condition.multi && (
                        <div className='flex items-center'>
                          <div className='mx-8'>From</div>
                          <PropertyDropdown
                            title={condition.fromValue || 'From'}
                            options={getUniqueValuesById(condition.columnId, dropdownOptions) || []}
                            selectColumn={'fromValue'} condindex={index} />
                        </div>
                      )}
                      <div className='flex my-8 items-center'>
                        <div className='mx-8'>To</div>
                        <PropertyDropdown
                          title={condition.toValue || 'To'}
                          options={getUniqueValuesById(condition.columnId, dropdownOptions) || []}
                          selectColumn={'toValue'} condindex={index} />
                      </div>

                    </div>
                  )}

                </div>
                {index < conditions.length - 1 && (
                  <div className="">
                    <ButtonGroup index={index} />
                  </div>
                )}
              </div>

            )) : (
              <div></div>
            )}
          </div>
        }



        <div className='mt-4 flex flex-row gap-2'>
          <IconButton label="Add Conditions" Icon={AddFilled} onClick={handleAddCondition} isSave={false} />
          <IconButton label="Save" Icon={Save} onClick={() => setCondition(true)} isSave={true} />
        </div>
      </div>
    </div>
  );
};

export default TriggerSettings;
