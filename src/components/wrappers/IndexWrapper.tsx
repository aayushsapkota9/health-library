import React from 'react';
interface FormWrapperProps {
  children: React.ReactNode;
}

const IndexWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <>
      <div className="create-box-styles">{children}</div>
    </>
  );
};

export default IndexWrapper;
