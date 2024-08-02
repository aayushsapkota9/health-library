import React from 'react';
import FormHeader from '../heading/createHeader';
interface FormWrapperProps {
  headerTitle: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ headerTitle, children }) => {
  return (
    <>
      <div>
        <FormHeader title={headerTitle} />
      </div>{' '}
      <div className="create-box-styles">{children}</div>
    </>
  );
};

export default FormWrapper;
