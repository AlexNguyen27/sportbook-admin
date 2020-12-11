import moment from "moment";
import { DATE_TIME } from "./common";
import REGIONS from "../components/locales/regions.json";
import DISTRICTS from "../components/locales/districts.json";
import WARDS from "../components/locales/wards.json";

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
};

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
  return n.toFixed(toFixed).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + currency;
};

export const isSameOrAfterNow = (startTime, selectedStartDay) => {
  const day = selectedStartDay + " " + startTime;
  console.log("da----", day);
  return moment(day, "DD-MM-YYYY HH:mm:ss").isSameOrAfter(moment());
};

export const getAddress = (data) => {
  if (data) {
    const { address, regionCode, districtCode, wardCode } = data;
    return `${address}, ${WARDS[wardCode]?.name_with_type}, ${
      DISTRICTS[districtCode]?.name_with_type
    }, ${REGIONS[regionCode]?.name_with_type || ""}`;
  }
  return "";
};