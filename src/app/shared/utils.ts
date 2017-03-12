/**
 * Created by Lee Jongki on 2017-03-12.
 */

export const namedlist = function(fields) {
  return function(arr) {
    var obj = { };
    for(var i = 0; i < arr.length; i++) {
      obj[fields[i]] = arr[i];
    }
    return obj;
  };
};
