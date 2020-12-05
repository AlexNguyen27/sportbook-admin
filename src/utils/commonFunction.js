import moment from 'moment';
import { DATE_TIME } from './common';
export const arrayToObject = (array) => {
  return array.reduce((obj, item) => {
    if (item.id) {
      obj[item.id] = item;
      if (item.posts) {
        obj[item.id].totalPosts = item.posts.length;
      }
    }
    return obj;
  }, {});
};

export function getPopularPost(o, n) {
  var keys = Object.keys(o).map((key) => o[key]);
  keys.sort(function (a, b) {
    if (b.reactions && a.reactions) {
      return b.reactions.length - a.reactions.length;
    }
  });
  return keys.slice(0, n);
}


export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const getFullname = (firstname, lastname) => {
  let fullname = "";
  if (firstname) {
    fullname += firstname + " ";
  }
  if (lastname) {
    fullname += lastname;
  }
  return fullname;
};

export const getDateTime = (date) => moment(date).format(DATE_TIME);

export const formatThousandVND = (n, currency, toFixed = 2) => {
  return n.toFixed(toFixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}