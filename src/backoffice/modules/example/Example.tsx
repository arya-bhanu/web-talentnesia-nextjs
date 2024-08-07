import React from 'react';
import ExampleView from './Example.view';
import FormExample from './components/form-example/FormExample';
import TableExample from './components/table-example/TableExample';

const Example: React.FC = () => {
  return (
    <ExampleView>
      <FormExample />
      <TableExample />
    </ExampleView>
  );
};

export default Example;
