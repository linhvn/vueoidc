import Http from 'axios'
export const Get = (apiUrl, query) => {
  return Http({
    url: apiUrl,
    method: 'GET',
    params: query || null
  })
}

export const Post = (apiUrl, data) => {
  return Http({
    url: apiUrl,
    method: 'POST',
    data: data
  })
}

export const Delete = (apiUrl, data) => {
  return Http({
    url: apiUrl,
    method: 'DELETE',
    data: data
  })
}
