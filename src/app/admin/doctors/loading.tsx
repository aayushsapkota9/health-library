import { SquareLoader } from '@/src/components/Loading/SquareLoader';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex  justify-center items-center mt-[40vh]">
      <SquareLoader></SquareLoader>{' '}
    </div>
  );
}
