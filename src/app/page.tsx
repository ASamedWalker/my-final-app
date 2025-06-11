```typescript
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Greeting {
  message: string;
}

const HomePage = () => {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  const { data, isLoading, error } = useQuery(
    'greeting',
    async () => {
      const response = await axios.get('/api/greeting');
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (data) {
      setGreeting(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold">Hello, {session?.user?.name}!</h1>
      {greeting && <p>{greeting.message}</p>}
    </div>
  );
};

export default HomePage;
```