export type ApiProps<T> = {
  route?: string | number;
  body?: T;
  method?: string;
}

const URL_BASE = 'http://localhost:3000/books';

async function api<T>({ route, body, method = 'GET' }: ApiProps<T> = {}) {
  const url = route ? `${URL_BASE}/${route}` : URL_BASE;
  
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export { api };