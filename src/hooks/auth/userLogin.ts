import Cookies from 'js-cookie';
import { authService } from '../../services/index';
import { User } from '../../types/user';

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password);
    if (user) {
      console.log(user, 'user is set');

      Cookies.set('currentUser', JSON.stringify(user));
    }
    return user as User;
  };

  return { login };
};
