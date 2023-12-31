export const newRecord = (str, target) => {
  let correctNum = 0;
  let correctLoc = 0;
  let strDigits = {};
  let targetDigits = {};
  for (let i = 0; i < target.length; i++) {
    if (str[i] == target[i]) correctLoc++;
    strDigits[str[i]] = (strDigits[str[i]] || 0) + 1;
    targetDigits[target[i]] = (targetDigits[target[i]] || 0) + 1;
  }

  for (const num in targetDigits) {
    correctNum += Math.min(strDigits[num] || 0, targetDigits[num]);
  }
  return [
    correctNum == target.length && correctLoc == target.length,
    `${correctNum} correct number${
      correctNum > 1 ? 's' : ''
    } and ${correctLoc} correct location${correctLoc > 1 ? 's' : ''}` + '\n',
  ];
};
