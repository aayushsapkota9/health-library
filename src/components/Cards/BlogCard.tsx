import {
  AspectRatio,
  Button,
  Card,
  CardSection,
  Flex,
  Text,
} from '@mantine/core';

interface ICardProps {
  id: string | number;
  title: string;
  address: string;
  imageUrl: string;
  imageAlt: string;
}
const BlogCard = ({ id, title, imageUrl, address, imageAlt }: ICardProps) => {
  return (
    <Card
      key={id}
      shadow="sm"
      py={0}
      className="bg-tertiary w-[18rem] md:w-[35rem] "
    >
      <CardSection>
        <AspectRatio ratio={16 / 9} mx="auto">
          <img
            src={process.env.NEXT_PUBLIC_BASE_URL + `/${imageUrl}`}
            alt={imageAlt}
          />
        </AspectRatio>
      </CardSection>
      <CardSection h={100}>
        <div className="ml-10 mt-5">
          <Flex justify="center" direction={'column'} wrap={'nowrap'}>
            <div className="flex justify-between mx-5">
              {' '}
              <Text className="text-textPrimary font-display mt-2 text-xl font-bold ">
                {title}
              </Text>
              <Button>Book an Appointment</Button>
            </div>
            <Text className="text-textPrimary font-display mt-2 text-md  mx-5">
              {address}
            </Text>
          </Flex>
        </div>
      </CardSection>
    </Card>
  );
};

export default BlogCard;

//Dimensions: 240 x 347
// GCD: 1
// Aspect: 240 : 347
// Ratio: 0.692
