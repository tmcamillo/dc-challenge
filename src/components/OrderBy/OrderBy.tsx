import React from 'react';

export interface IOrder {
  setOrder: (newsState: string) => void;
  order: string;
}

function OrderBy({ setOrder, order }: IOrder): JSX.Element {
  const handleOrderBy = (e: any) => {
    order === e.target.value ? setOrder('') : setOrder(e.target.value);
  };
  const style =
    'py-2 px-4 text-sm font-medium  focus:z-10 focus:ring-2 focus:ring-blue-70 bg-gray-700 border-gray-700 text-white hover:text-white hover:bg-gray-400 focus:ring-blue-500 focus:text-white';
  return (
    <section className='flex justify-center' role='group'>
      <button
        type='button'
        value='oldest'
        onClick={(e) => handleOrderBy(e)}
        className={`${style} rounded-l-lg ${
          order === 'oldest' ? 'bg-gray-500' : ''
        }`}
      >
        oldest
      </button>
      <button
        type='button'
        value='latest'
        className={`${style} rounded-r-md ${
          order === 'latest' ? 'bg-gray-500' : ''
        }`}
        onClick={(e) => handleOrderBy(e)}
      >
        latest
      </button>
    </section>
  );
}

export default OrderBy;
