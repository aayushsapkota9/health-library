import { TextInput } from '@mantine/core';
import '@mantine/core/styles.css';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <CatCard {...mockCatCardProps.base} />
        <CatCard {...mockCatCardProps.base} />
        <CatCard {...mockCatCardProps.base} />
        <CatCard {...mockCatCardProps.base} />
        <TextInput label="Label" placeholder="Placeholder"></TextInput>
      </div>
    </main>
  );
}
