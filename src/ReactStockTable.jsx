import React from 'react';

const StockTable = ({ data }) => {
  return (
    <table className="border border-gray-200">
      <thead>
        <tr>
          <th className="px-3 py-0 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Market
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, symbol, price, delta }) => (
          <tr key={name + symbol}>
            <td className="px-3 py-0 border-b border-gray-200 bg-white text-xs">
              <p>
                {name} ({symbol}) is at ${price}
              </p>
              <div
                style={{ width: `${Math.abs(delta)}px`, height: '10px' }}
                className={delta >= 0 ? 'bg-green-500' : 'bg-red-500'}
              ></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
