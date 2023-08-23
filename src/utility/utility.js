function dateDisplay(dateObj) {
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  newdate = day + '/' + month + '/' + year;
}

module.exports = dateDisplay;
