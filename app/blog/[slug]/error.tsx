'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <div className="text-muted-foreground text-6xl font-bold">500</div>
        <h1 className="text-2xl font-semibold tracking-tight">An error occurred</h1>
        <p className="text-muted-foreground">An error has occurred. Please try again later.</p>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
