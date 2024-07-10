import { HttpService } from '.';
import apiRoutes from '../config/api.config';

export class AuthService {
  login = async (username: string, password: string) => {
    const http = new HttpService();
    const response: any = await http.service().push(apiRoutes.auth.login, {
      email: username,
      password,
    });
    if (response.status !== 200) {
      return null;
    }
    const jwtToken = response.data.access_token;
    // eslint-disable-next-line
    const [header, payload, signature] = jwtToken.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const name = decodedPayload.name;
    const email = decodedPayload.email;
    const roles = decodedPayload.roles;
    const id = decodedPayload.id;
    const expiredAt = decodedPayload.exp;

    return {
      name,
      email,
      roles,
      id,
      expiredAt,
      accessToken: jwtToken,
    };
  };

  getMe = (_userId: string) => {
    // return this.instance
    //   .get(`/users/${userId}`, {
    //     headers: getAuthorizationHeader(),
    //   })
    //   .then((res) => {
    //     return res.data;
    //   });
    return;
  };

  // uploadAvatar = (userId: string, newAvatar: File) => {
  //   const formData = new FormData();
  //   formData.append('file', newAvatar);
  //   return this.instance
  //     .post(`/users/${userId}/upload`, formData, {
  //       headers: getAuthorizationHeader(),
  //     })
  //     .then((res) => {
  //       return {
  //         newAvatar: res.data.data.url,
  //       };
  //     });
  // };
}
