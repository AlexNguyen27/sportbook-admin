import axios from '../../utils/axios';
import {
  GET_QUESTIONS,
  GET_ERRORS,
  GET_QUESTION_DETAIL,
  DELETE_QUESTION,
  ADD_QUESTION,
  EDIT_QUESTION,
  CLEAR_ERRORS,
} from './types';
import { logoutUser } from './auth';
import { arrayToObject } from '../../utils/commonFunction';
import Swal from 'sweetalert2';

// GET majors data
export const getQuestionByLectureId = (setLoading, lectureId) => async (
  dispatch
) => {
  try {
    // TODO : GET QUESNTIONS BANK
    const questionsArray = await axios.get(
      `/api/questions/lectures/${lectureId}`,
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const questionsObject = arrayToObject(questionsArray.data.data);

    dispatch({
      type: GET_QUESTIONS,
      questions_bank: questionsObject,
    });

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

export const getQuestionById = (setLoading, id) => async (
  dispatch,
  getState
) => {
  const { questions_bank } = getState().question;
  try {
    dispatch({
      type: GET_QUESTION_DETAIL,
      question_detail: questions_bank[id],
    });

    setLoading(false);
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });
  }
};

// DELETE GROUP
export const deleteQuestion = (setLoading, questionId) => async (dispatch) => {
  try {
    await axios.delete(`api/questions/${questionId}`, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: DELETE_QUESTION,
      selectedId: questionId,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    // console.log(error);
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// ADD NEW Course
export const addNewQuestion = (setLoading, lectureId, questionData) => async (
  dispatch
) => {
  try {
    const res = await axios.post(
      `api/questions/lectures/${lectureId}`,
      questionData,
      {
        headers: { Authorization: localStorage.token },
      }
    );

    const newQuestion = res.data.data;
    dispatch({
      type: ADD_QUESTION,
      newQuestion,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });

    setLoading(false);
    // using sweetalert2
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};

// EDIT Course NAME
export const editQuestion = (setLoading, questionId, questionData) => async (
  dispatch
) => {
  try {
    const res = await axios.put(`api/questions/${questionId}`, questionData, {
      headers: { Authorization: localStorage.token },
    });

    dispatch({
      type: EDIT_QUESTION,
      newQuestion: res.data.data,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
    setLoading(false);
    Swal.fire({
      // using sweetalert2
      position: 'center',
      type: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    logoutUser(dispatch, error);
    dispatch({
      type: GET_ERRORS,
      errors: error.response.data,
    });
  }
};
