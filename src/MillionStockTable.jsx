import React from 'react';
import { block, For } from '../million/react.mjs';

const StockRow = block(({ name, symbol, price, delta }) => {
  return (
    <tr>
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
  );
});

const StockTable = block(({ data }) => {
  return (
    <table className="border border-gray-200">
      <thead>
        <tr>
          <th className="px-5 py-0 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Market
          </th>
        </tr>
      </thead>
      <tbody>
        <For each={data} memo>
          {({ name, symbol, price, delta }) => (
            <StockRow
              key={name + symbol}
              name={name}
              symbol={symbol}
              price={price}
              delta={delta}
            />
          )}
        </For>
      </tbody>
    </table>
  );
});

export default StockTable;
