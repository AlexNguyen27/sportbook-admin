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
