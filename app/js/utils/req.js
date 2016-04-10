import toastr from 'toastr';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.text().then((text) => Promise.reject(text));
};

export default (path, options = {}) => {
  return fetch(
    'path',
    Object.assign({credentials: 'same-origin'}, options)
  )
  .then(checkStatus)
  .then((response) => response.json())
  .then((response) => {
    toastr.success('request succeeded', response);
    return response;
  })
  .catch((error) => {
    toastr.warning(error);
    return Promise.reject('request failed', error);
  });
};