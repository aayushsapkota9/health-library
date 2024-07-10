import { NavigateToCreate } from '../mantine';
import Heading from './heading';
interface Props {
  title: string;
}

const IndexHeader = ({ title }: Props) => {
  return (
    <div className="table-top">
      <Heading name={title + ' list'}></Heading>
      <NavigateToCreate title={title}></NavigateToCreate>
    </div>
  );
};

export default IndexHeader;
