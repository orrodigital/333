import { useEffect, useState } from 'react';
import { supabase } from '../libs/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(supabase.auth.getUser ? null : null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // @ts-ignore
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);
  return { user };
}