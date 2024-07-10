import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { authService } from '../../services/index';
import { User } from '../../types/user';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get('currentUser');

    try {
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
      }
    } catch (error) {
      // Handle JSON parsing error if needed
      console.error('Error parsing currentUser cookie:', error);
    }
  }, []);

  const refetchUser = async (userId: string) => {
    try {
      const userInfo: any = await authService.getMe(userId);
      const currentUser = Cookies.get('currentUser');

      if (userInfo && currentUser) {
        const newUser = {
          ...JSON.parse(currentUser),
          username: userInfo.username,
          avatar: userInfo.avatar,
        };
        Cookies.set('currentUser', JSON.stringify(newUser));
        setUser(newUser);
      }
    } catch (error) {
      // Handle refetching error if needed
      console.error('Error refetching user:', error);
    }
  };
  return { user, refetchUser };
};
