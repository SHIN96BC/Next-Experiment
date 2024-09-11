import Image from 'next/image';
import TestComponent from '@Components/TestComponent';

export default function Home() {
  const r = '3';
  console.log(r);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <TestComponent />
    </main>
  );
}
