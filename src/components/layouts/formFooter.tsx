import { COLOR } from '@/src/types/enums/colors.enums';
import { Button } from '@mantine/core';
interface FormFooterProps {
  title: string;
}

const FormFooter = ({ title }: FormFooterProps) => {
  return (
    <div>
      {' '}
      <Button
        type="submit"
        color={COLOR.secondary}
        mt={10}
        radius={'md'}
        size="md"
        variant="outline"
      >
        {' '}
        {title ? title : 'Submit'}
      </Button>
    </div>
  );
};

export default FormFooter;
