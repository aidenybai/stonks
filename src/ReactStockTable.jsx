import React from 'react';

const StockRow = ({ name, symbol, price, delta }) => {
  return (
    <tr>
      <td className="px-3 py-0 border-b border-gray-200 bg-white text-xs">
        {name}
      </td>
      <td className="font-mono px-3 py-0 border-b border-gray-200 bg-white text-xs">
        {symbol}
      </td>
      <td className="font-mono px-3 py-0 border-b border-gray-200 bg-white text-xs">
        ${price}
      </td>
      <td className="font-mono flex items-center gap-2 px-3 py-0 border-b border-gray-200 bg-white text-xs">
        {delta}
        <div
          style={{ width: `${Math.abs(delta)}px`, height: '10px' }}
          className={delta >= 0 ? 'bg-green-500' : 'bg-red-500'}
        ></div>
      </td>
    </tr>
  );
};

const StockTable = ({ data }) => {
  return (
    <table className="border border-gray-200">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Symbol
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Delta
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, symbol, price, delta }) => (
          <StockRow
            key={name + symbol}
            name={name}
            symbol={symbol}
            price={price}
            delta={delta}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
