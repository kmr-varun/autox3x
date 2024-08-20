// import React from 'react';



// interface AutomationActionsProps {
//   dropdownOptions: { [key: string]: string[] };
//   handleSelect: (selectedOption: string) => void;
// }

// const AutomationActions: React.FC<AutomationActionsProps> = ({
//   dropdownOptions,
//   handleSelect
// }) => {
//   const { workflow } = useSelector((state: RootState) => state.automation);
//   const actions = useSelector(selectActions);
//   return (
//     <div className='flex w-full max-w-screen-lg mx-auto gap-16 '>
//       {/* "When" Block */}
//       <div className='flex-1 flex items-center'>
//         <div className='w-full'>
//           <div className='my-4'>
//             <span className='text-3xl'>When</span><br />
//             <span className='text-xl text-[#848694]'>this happens</span>
//           </div>
//           <StatusCard
//             triggerLabel="Trigger"
//             statusLabel={workflow.name}
//             barColor="#95A4FC"
//           />
//         </div>
//       </div>

//       {/* "Then" and "And also" Blocks */}
//       <div className='flex-1 flex flex-col gap-20'>
//         <div className='my-4 space-y-4'>
//           <div className='my-4'>
//             <span className='text-3xl'>Then</span><br />
//             <span className='text-xl text-[#848694]'>do this</span>
//           </div>

//           {actions.map((action, index) => (
//             <StatusCard
//               key={index}
//               triggerLabel="Action"
//               statusLabel={action.name}
//               barColor="#BAEDBD"
//             />
//           ))}


//           {/* <OptionsDropdown
//             title="Add Action"
//             options={dropdownOptions}
//             onSelect={handleSelect}
//           /> */}
//         </div>

//         {/* <div className='my-4 space-y-4'>
//           <div className='my-4'>
//             <span className='text-3xl'>And also</span><br />
//             <span className='text-xl text-[#848694]'>do this</span>
//           </div>
//           <StatusCard 
//             triggerLabel="Action" 
//             statusLabel="Send a follow Reminder" 
//             barColor="#B1E3FF" 
//           />
//           <OptionsDropdown
//             title="Add Action"
//             options={dropdownOptions}
//             onSelect={handleSelect}
//           />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AutomationActions;
