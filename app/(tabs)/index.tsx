import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('home');

  }, []);

  return null;
}
