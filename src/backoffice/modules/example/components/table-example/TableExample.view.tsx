import React from 'react';

interface TableExampleViewProps {
  data: { id: number; name: string }[];
}

const TableExampleView: React.FC<TableExampleViewProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableExampleView;
