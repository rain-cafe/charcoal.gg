import { auth } from './api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Button
        onClick={() => {
          document.body.classList.toggle('dark');
        }}
      >
        Hello!
      </Button> */}
    </main>
  );
}
