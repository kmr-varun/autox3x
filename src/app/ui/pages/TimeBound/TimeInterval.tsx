"use client";
import React, { useState } from 'react';
import { ChevronDown, Save } from '@carbon/icons-react';
import IconButton from '../../components/Buttons/IconButton';
import { useDispatch } from 'react-redux';
import { WorkflowState } from '@/app/types/workflowTypes';
import { setWorkflowDetails } from '@/app/helpers/actions';

const TimeInterval: React.FC = () => {
  const [triggerFrequency, setTriggerFrequency] = useState<'days' | 'weeks' | 'months'>('days');
  const [triggerPeriod, setTriggerPeriod] = useState<number | ''>(1);
  const [triggerTime, setTriggerTime] = useState<string>('08:00');
  const [isTriggerTypeOpen, setIsTriggerTypeOpen] = useState(false);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getFormattedText = () => {
    const formattedTime = formatTime(triggerTime);
    const unitText = triggerFrequency === 'days' ? 'day' : triggerFrequency === 'weeks' ? 'week' : 'month';
    const amountText = triggerPeriod && triggerPeriod > 1 ? `${triggerPeriod} ${unitText}s` : `1 ${unitText}`;

    return `Every ${amountText} at ${formattedTime}`;
  };

  const handleTriggerTypeChange = (selectedTriggerType: 'days' | 'weeks' | 'months') => {
    setTriggerFrequency(selectedTriggerType);
    setIsTriggerTypeOpen(false);
  };

  

  const dispatch = useDispatch();

  const handleUpdateWorkflow = (option: any) => {
    const updatedDetails: Partial<WorkflowState> = {
      workflowString: option.name,
      workflowData: option.data,
    };

    console.log(updatedDetails);
    dispatch(setWorkflowDetails(updatedDetails));
  };

  const handleSave = () => {
    const data = {
      data: [{
        triggerFrequency,
        triggerTime,
        triggerPeriod
      }]
    };
    handleUpdateWorkflow({name: getFormattedText(), data: data});
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Handle empty input
    if (value === '') {
      setTriggerPeriod(''); // Allow empty input
    } else {
      const numberValue = parseInt(value, 10);
      setTriggerPeriod(isNaN(numberValue) ? '' : numberValue);
    }
  };

  return (
    <div className="relative bg-[#242428] max-w text-white">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="py-3 px-6 bg-[#35363A] rounded-xl w-32 text-center">
            Every
          </div>
          <input
            type="number"
            id="trigger-period"
            value={triggerPeriod === '' ? '' : triggerPeriod}
            onChange={handlePeriodChange}
            className="bg-transparent border border-[#848694] rounded-lg py-2 px-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            min="1"
            placeholder="1"
          />
          <div className="relative text-left">
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#35363A] border-[#848694]"
              onClick={() => setIsTriggerTypeOpen(!isTriggerTypeOpen)}
            >
              {triggerFrequency.charAt(0).toUpperCase() + triggerFrequency.slice(1)}
              <ChevronDown className="ml-2" />
            </button>
            {isTriggerTypeOpen && (
              <div className="origin-center absolute mt-2 w-56 rounded-lg z-10 bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {['days', 'weeks', 'months'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTriggerTypeChange(type as 'days' | 'weeks' | 'months')}
                      className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="trigger-time" className="text-sm font-medium">At: </label>
            <input
              type="time"
              id="trigger-time"
              value={triggerTime}
              onChange={(e) => setTriggerTime(e.target.value)}
              className="bg-transparent border border-[#848694] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <IconButton label="Save" Icon={Save} onClick={handleSave} isSave={false} />
        </div>
      </div>
    </div>
  );
};

export default TimeInterval;
