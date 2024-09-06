import React from 'react';

export interface IFormBlogView {
  id: string | null;
}
const FormBlogView: React.FC<IFormBlogView> = ({ id }) => {
  return <div>FormBlogView</div>;
};

export default FormBlogView;
