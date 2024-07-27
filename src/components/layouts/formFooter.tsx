import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
interface FormFooterProps {
  title: string;
}

const FormFooter = ({ title }: FormFooterProps) => {
  return (
    <div>
      {' '}
      <Button type="submit" color={COLOR.primary} mt={10}>
        {' '}
        {title ? title : 'Submit'}
      </Button>
    </div>
  );
};

export default FormFooter;
