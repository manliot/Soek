import { useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';

export default function Home() {
  const { replaceRoute } = useNavigation()
  useEffect(() => {
    replaceRoute('/home');
  }, []);

  return null
}
