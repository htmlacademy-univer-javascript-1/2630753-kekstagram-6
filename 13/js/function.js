const checkString = function(string, length){
  if(string.length <= length){
    return true;
  }
  else{
    return false;
  }
};

checkString('vueirvveuir', 20);
checkString('vueirvveuir', 9);

const checkPalindrom = function(string){
  const stringRev = string.trim().split('').reverse().join('');
  if(string.trim() === stringRev){
    return true;
  }
  else{
    return false;
  }
};

checkPalindrom('    топот        ');
checkPalindrom('топор');

const checkTime = function(dayStart, dayEnd, meetingStart, meetingDuration){
  dayStartInMin = 0
  dayEndInMin = 0
  meetingStartInMin = 0

  dayStart = dayStart.split(":")
  dayStartInMin += Number(dayStart[0]) * 60 + Number(dayStart[1])

  dayEnd = dayEnd.split(":")
  dayEndInMin += Number(dayEnd[0]) * 60 + Number(dayEnd[1])

  meetingStart = meetingStart.split(":")
  meetingStartInMin += Number(meetingStart[0]) * 60 + Number(meetingStart[1])

  if (dayStartInMin <= meetingStartInMin && meetingStartInMin <= dayEndInMin && ((dayEndInMin - meetingStartInMin) >= meetingDuration)){
    return true
  }
  return false
};

checkTime('8:0', '10:0', '8:0', 120);
