export const parseResponse = (responseData) => {
  var data = responseData.data || {};
  var error = responseData.error || null;

  return {
    error,
    data
  }
}
