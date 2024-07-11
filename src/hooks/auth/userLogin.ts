import Cookies from 'js-cookie';
import { authService } from '../../services/index';
import { User } from '../../types/user';
import { useState } from 'react';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(username, password);
      if (user) {
        Cookies.set('currentUser', JSON.stringify(user));
      }
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
