const validCNP = (cnp) => {
  //CNP : S YY MM DD CC NNN C
  cnp = cnp.toString();
  if (cnp.length != 13) {
    return false;
  }
  cnp = cnp.split("").map(function (a) {
    return parseInt(a, 10);
  });
  let currentYear = new Date().getFullYear(),
    currentMonth = new Date().getMonth() + 1,
    currentDay = new Date().getDate(),
    cnpYear = cnp[1] * 10 + cnp[2];
  let cnpMonth = cnp[3] * 10 + cnp[4],
    cnpDay = cnp[5] * 10 + cnp[6],
    contyCode = cnp[7] * 10 + cnp[8],
    control = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
  if (cnp.length !== 13) {
    return false;
  }
  switch (cnp[0]) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 7:
    case 8:
    case 9:
      {
        cnpYear += 1900;
      }
      break;
    case 5:
    case 6: {
      cnpYear += 2000;
      if (cnpYear > currentYear) {
        return false;
      }
      if (
        cnpYear === currentYear &&
        (cnpMonth > currentMonth ||
          (cnpMonth === currentMonth && cnpDay > currentDay))
      ) {
        return false;
      }
    }
  }
  switch (cnpMonth) {
    case 2:
      if (
        ((cnpYear % 4 === 0 && cnpYear % 100 !== 0) || cnpYear % 400 === 0) &&
        cnpDay > 29
      ) {
      }
      if (cnpDay > 28) {
        return false;
      }
    case 3:
    case 4:
    case 6:
    case 9:
    case 11:
      if (cnpDay > 30) {
        return false;
      }
    default:
      if (cnpDay > 31) {
        return false;
      }
  }
  if (contyCode < 0 || (contyCode > 46 && contyCode < 51) || contyCode > 52) {
    return false;
  }
  let controlSum = cnp.reduce((sum, cnp, i) => {
    if (control[i]) {
      return sum + cnp * control[i];
    }
    return sum;
  }, 0);
  if (
    controlSum % 11 !== cnp[12] ||
    (controlSum % 11 === 10 && cnp[12] !== 1)
  ) {
    return false;
  }
  return true;
};
