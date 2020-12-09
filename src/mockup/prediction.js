export const prediction = {
  status: "success",
  count: 7,
  prediction_data: [
    {
      datetime: "2020-10-21",
      count: 8,
      std: 1.1437,
      predicted_rate: 87.5,
      prediction_data: [1.8, 0, 0.9, 6.6, 7.7, 3, 2.9, 0.8],
      real_data: [2, 1, 3, 7, 9, 4, 2, 1],
      std_detail: [0, 1, 4.4, 0.2, 1.7, 1, 0.8, 0],
    },
    {
      datetime: "2020-10-22",
      count: 8,
      std: 1.4338,
      predicted_rate: 62.5,
      prediction_data: [1.6, 2, 5.4, 5.3, 7.1, 5, 3.8, 2.1],
      real_data: [0, 0, 6, 7, 7, 6, 3, 2],
      std_detail: [2.6, 4, 0.4, 2.9, 0, 1, 0.6, 0],
    },
    {
      datetime: "2020-10-23",
      count: 8,
      std: 1.4413,
      predicted_rate: 75,
      prediction_data: [2.5, 2.7, 5.8, 8.1, 8.7, 7.7, 6, 4.4],
      real_data: [2, 1, 6, 8, 10, 10, 5, 5],
      std_detail: [0.2, 2.9, 0, 0, 1.7, 5.3, 1, 0.4],
    },
    {
      datetime: "2020-10-24",
      count: 8,
      std: 1.9338,
      predicted_rate: 50,
      prediction_data: [3.7, 6, 8.8, 8.5, 9.7, 7.8, 8, 4.6],
      real_data: [4, 4, 7, 10, 10, 8, 8, 7],
      std_detail: [0.1, 4, 3.2, 2.2, 0.1, 0, 0, 5.8],
    },
    {
      datetime: "2020-10-25",
      count: 8,
      std: 1.5713,
      predicted_rate: 75,
      prediction_data: [4.2, 6, 8.7, 8.1, 9.4, 8.9, 5.5, 3.9],
      real_data: [3, 7, 10, 9, 9, 7, 6, 2],
      std_detail: [1.4, 1, 1.7, 0.8, 0.2, 3.6, 0.2, 3.6],
    },
    {
      datetime: "2020-10-26",
      count: 8,
      std: 2.1012,
      predicted_rate: 75,
      prediction_data: [0.1, 0, 1.2, 4.7, 4.8, 0.9, 0.9, 0.9],
      real_data: [0, 0, 2, 8, 3, 2, 0, 1],
      std_detail: [0, 0, 0.6, 10.9, 3.2, 1.2, 0.8, 0],
    },
    {
      datetime: "2020-10-27",
      count: 8,
      std: 7.125,
      predicted_rate: 62.5,
      prediction_data: [0, 0, 0, 0, 0, 0, 0, 0],
      real_data: [0, 1, 2, 5, 5, 1, 0, 1],
      std_detail: [0, 1, 4, 25, 25, 1, 0, 1],
    },
  ],
  q: null,
};

export const startTimes = [
  "06:00",
  "07:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export const describe = {
  age: {
    count: 1712,
    mean: 23.9386682243,
    std: 2.5635762028,
    min: 20,
    "25%": 22,
    "50%": 24,
    "75%": 26,
    max: 28,
  },
  price: {
    count: 1712,
    mean: 437500,
    std: 81991.9312932353,
    min: 300000,
    "25%": 412500,
    "50%": 475000,
    "75%": 500000,
    max: 500000,
  },
  amount: {
    count: 1712,
    mean: 4.4813084112,
    std: 3.1261609761,
    min: 0,
    "25%": 2,
    "50%": 4,
    "75%": 7,
    max: 10,
  },
};
