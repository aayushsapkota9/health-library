import React from 'react';
import FormHeader from '../heading/createHeader';
interface FormWrapperProps {
  headerTitle: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ headerTitle, children }) => {
  return (
    <>
      <FormHeader title={headerTitle} />
      <div className="create-box-styles">{children}</div>
    </>
  );
};

export default FormWrapper;
