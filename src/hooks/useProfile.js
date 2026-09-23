import { useEffect, useState, useCallback } from 'react';
import { getProfile, saveProfile } from '../db/database';

export function useProfile() {
  const [profile, setProfile] = useState(undefined); // undefined = loading, null = none
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const p = await getProfile();
    setProfile(p || null);
    setLoading(false);
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const update = useCallback(async (data) => {
    await saveProfile(data);
    await reload();
  }, [reload]);

  return { profile, loading, saveProfile: update, reload };
}
