import { UNAUTHENTICATE } from '../store/actions/types';
export default (dispatch, error = null) => {
  // 401 : UNAUTHORIZED
  if (!error || (error.extensions && error[0].extensions.exception.status === 401)) {
    dispatch({
      type: UNAUTHENTICATE,
    });
  }
};
