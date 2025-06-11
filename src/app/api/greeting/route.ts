```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

const greetingRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  if (name) {
    const greeting = `Hello, ${name}!`;
    res.status(200).json({ greeting });
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
};

export default greetingRoute;
```