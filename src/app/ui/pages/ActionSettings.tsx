import React, { useState } from 'react';
import { Save, ChevronDown } from '@carbon/icons-react'; // Adjust import path as needed
import IconButton from '../components/Buttons/IconButton';

interface ActionSettingsProps {
  handleSelect: (selectedOption: string) => void;
}

const ActionSettings: React.FC<ActionSettingsProps> = ({ handleSelect }) => {
  const [timing, setTiming] = useState<'before' | 'on' | 'after'>('on');
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [date, setDate] = useState<string>('');
  
  const [isTimingOpen, setIsTimingOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const handleSave = () => {
    console.log('Follow Reminder:', { timing, period, date });
  };

  const timingOptions = ['before', 'on', 'after'];
  const periodOptions = ['day', 'week', 'month'];

  return (
    <div className='p-8'>
      <div className='text-xl text-[#848694] my-4'>Action Settings</div>
      <div className='text-3xl text-white my-2'>Send a Follow Reminder</div>
      <div className='text-[#848694] text-[15px]'>The Action will fire when sending a follow-up reminder</div>
      
      <div className='my-12'>
        <div className='text-white my-2 text-base'>Conditions</div>
        <div className='flex gap-4 items-center'>
          {/* Timing Dropdown */}
          <div className="relative text-left flex-1">
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-full bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
              onClick={() => setIsTimingOpen(!isTimingOpen)}
            >
              <span>{timing.charAt(0).toUpperCase() + timing.slice(1)}</span>
              <ChevronDown className="ml-2" />
            </button>
            {isTimingOpen && (
              <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#0B0B0B] max-h-60 overflow-y-auto custom-scrollbar">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {timingOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTiming(option as 'before' | 'on' | 'after');
                        setIsTimingOpen(false);
                      }}
                      className="w-full text-left px-6 py-2 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Period Dropdown */}
          <div className="relative text-left flex-1">
            <button
              className="flex items-center justify-between rounded-xl px-8 py-3 w-full bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
              onClick={() => setIsPeriodOpen(!isPeriodOpen)}
            >
              <span>{period.charAt(0).toUpperCase() + period.slice(1)}</span>
              <ChevronDown className="ml-2" />
            </button>
            {isPeriodOpen && (
              <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#0B0B0B] max-h-60 overflow-y-auto custom-scrollbar">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {periodOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setPeriod(option as 'day' | 'week' | 'month');
                        setIsPeriodOpen(false);
                      }}
                      className="w-full text-left px-6 py-2 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Date Input */}
          <div className='flex-1'>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='mt-1 block w-full bg-transparent border-[#848694] border rounded-xl px-8 py-3 text-sm text-white focus:outline-none'
            />
          </div>
        </div>

        <div className='py-6'>
          <div className='my-4'>
            <IconButton label="Save" Icon={Save} onClick={handleSave} isSave={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionSettings;
