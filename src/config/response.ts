const handleResponseErrorMessage = ({ error }: { error: any }) => {
  let message = error?.response?.message

  switch (error?.response?.status) {
    case 401:
      break;

    case 403:
      break;

    case 404:
      break;

    case 500:
      break;

    case 502:
      break;

    case 504:
      break;
    default:
      break;
  }
  return error;
}

export { handleResponseErrorMessage }