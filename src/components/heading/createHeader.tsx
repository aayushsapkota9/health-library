import { NavigateToIndex } from '../mantine';
import Heading from './heading';
interface Props {
  title: string;
}

const FormHeader = ({ title }: Props) => {
  return (
    <div className="table-top">
      <Heading name={title}></Heading>
      <NavigateToIndex></NavigateToIndex>
    </div>
  );
};

export default FormHeader;
