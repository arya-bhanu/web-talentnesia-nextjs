import React, { useState } from 'react';
import ModalSelect from '@/backoffice/components/modal-select/ModalSelect';
import { programData } from './[id].data';

interface IdModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const IdModal: React.FC<IdModalProps> = ({ open, setOpen }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const columns = [
    { key: 'no', val: 'No' },
    { key: 'name', val: 'Name' },
    { key: 'email', val: 'Email' },
    { key: 'nis', val: 'NIS' },
  ];

  const rows = programData.map((data, index) => ({
    no: index + 1,
    id: data.id,
    name: () => data.name,
    periode: '', // Add this line
    email: data.email,
    nis: data.nis
  }));

  return (
    <ModalSelect
      open={open}
      setOpen={setOpen}
      columns={columns}
      rows={rows}
      title="Select Student"
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export default IdModal;


//nunggu mas arya

// import React, { useState } from 'react';
// import ModalSelect from '@/backoffice/components/modal-select/ModalSelect';
// import { programData } from './[id].data';
// import Search from '@/../public/icons/iconamoon_search-bold.svg';
// import { Checkbox } from 'flowbite-react';

// interface IdModalProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const IdModal: React.FC<IdModalProps> = ({ open, setOpen }) => {
//   const [selected, setSelected] = useState<string[]>([]);
//   const [filter, setFilter] = useState('');

//   const columns = [
//     { key: 'select', val: '' },
//     { key: 'name', val: 'Name' },
//     { key: 'email', val: 'Email' },
//     { key: 'nis', val: 'NIS' },
//   ];

//   const rows = programData.map((data, index) => ({
//     ...data,
//     no: index + 1,
//     select: (
//       <Checkbox
//         checked={selected.includes(data.id)}
//         onChange={() => {
//           const newSelected = selected.includes(data.id)
//             ? selected.filter(id => id !== data.id)
//             : [...selected, data.id];
//           setSelected(newSelected);
//         }}
//       />
//     ),
//   }));

//   return (
//     <ModalSelect
//       open={open}
//       setOpen={setOpen}
//       columns={columns}
//       rows={rows}
//       title="Select Student"
//       selected={selected}
//       setSelected={setSelected}
//       filter={{ Filter: filter, setFilter }}
//       searchBar={
//         <div className="flex items-center max-w-xs w-full mb-4">
//           <label htmlFor="modal-search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//               <Search />
//             </div>
//             <input
//               type="text"
//               id="modal-search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search ..."
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//       }
//     />
//   );
// };

// export default IdModal;
