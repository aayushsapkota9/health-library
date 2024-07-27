import { NavigateToCreate } from '../mantine';
import Heading from './heading';
interface IIndexHeaderProps {
  title: string;
  href: string;
}

const IndexHeader = ({ title, href }: IIndexHeaderProps) => {
  return (
    <div className="table-top">
      <Heading name={`${title}s List`}></Heading>
      <NavigateToCreate title={title} url={href}></NavigateToCreate>
    </div>
  );
};

export default IndexHeader;
