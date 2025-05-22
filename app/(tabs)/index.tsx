import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('./home'); // ✅ Cible directement la page Home dans (tabs)
  }, []);

  return null;
}
