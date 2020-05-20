import axios from 'axios';

const host = 'http://assignment.dinomembers.com:8000';

export function requestSignup(email: string, username: string, pw: string) {
  return axios.post(`${host}/auth/users`, {
    email,
    username,
    pw,
  });
}

export function requestAuthentication(username: string, pw: string) {
  return axios.post(`${host}/auth/sessions`, {
    username,
    pw,
  });
}

export function requestDeauthentication() {
  return axios.delete(
      `${host}/auth/sessions/${sessionStorage.getItem('api-token') || ''}`);
}

export function requestListTodos() {
  return axios.get(`${host}/todos`, {
    headers: {
      'Api-Token': sessionStorage.getItem('api-token') || '',
    },
  });
}

export function requestCreateTodo(title: string, desc: string) {
  return axios.post(`${host}/todos`, {title, desc}, {
    headers: {
      'Api-Token': sessionStorage.getItem('api-token') || '',
    },
  });
}

export function requestDeleteTodo(id: string) {
  return axios.delete(`${host}/todos/${id}`, {
    headers: {
      'Api-Token': sessionStorage.getItem('api-token') || '',
    },
  });
}

export function requestUpdateTodo(
    id: string, newTitle: string|undefined, newDesc: string|undefined) {
  return axios.patch(
      `${host}/todos/${id}`,
      Object.assign(
          Object.assign(
              {}, newTitle === undefined ? {} : {'new-title': newTitle}),
          newDesc === undefined ? {} : {'new-desc': newDesc}),
      {
        headers: {
          'Api-Token': sessionStorage.getItem('api-token') || '',
        },
      });
}

export function requestUpdateTodoAccomplishment(
    id: string, accomplishment: boolean) {
  return axios.patch(
      `${host}/todos/${id}/accomplishment`,
      {accomplishment: accomplishment ? 'true' : 'false'}, {
        headers: {
          'Api-Token': sessionStorage.getItem('api-token') || '',
        },
      });
}