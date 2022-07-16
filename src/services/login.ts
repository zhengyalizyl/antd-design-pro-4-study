import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export interface RegisterParamsType {
  username: string;
  password: string;
  phone: string;
  captcha: string;
  prefix:string;
  confirmPassword:string;
  agreement?:boolean;
}


export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/admin/login', {
    method: 'POST',
    data: params,
  });
}
export async function fakeAccountRegister(params: RegisterParamsType) {
  return request('/admin/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
