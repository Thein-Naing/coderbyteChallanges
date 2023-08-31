/* Have the function MostFreeTime(strArr) read the strArr parameter being passed which will represent a full day 
 and will be filled with events that span from time X to time Y in the day. 
The format of each event will be hh:mmAM/PM-hh:mmAM/PM. 
For example, strArr may be [“10:00AM-12:30PM”,”02:00PM-02:45PM”,”09:10AM-09:50AM”]. 
Your program will have to output the longest amount of free time available between the start of your first event 
and the end of your last event in the format: hh:mm. The start event should be the earliest event in the day 
and the latest event should be the latest event in the day. 
The output for the previous input would therefore be 01:30 
(with the earliest event in the day starting at 09:10AM and the latest event ending at 02:45PM).
The input will contain at least 3 events and the events may be out of order.*/


/* This is coding challangen from junior full stack developer role interview.
This is correct solution and my solution is up to last step: adding a leading zero for (single-digit minutes) and 
(single-digit) hours step and I was stuck at this step and not finished in interview. */`
  
  
  //1. declare strArr for testing purpose
let  strArr = ["12:15PM-02:00PM", "09:00AM-10:00AM", "10:30AM-12:00PM" ];

const MostFreeTime = (strArr) => { 
 
  // 2.create an empty array to store the minutes of each event
  let minArr = [];
  // create the longest free time: initailly zero
  let longest = 0;
  
  // 3.function to convert a time string to minutes
  const  ParseTime = (time) => {
      let minutes = 0 
      // check for pm times
      // use regex string.mtach(regex) method
      if(time.match(/pm/i)) {  //The regular expression includes the i flag so that upper/lower case differences will be ignored.
          minutes += 12 * 60  // if time is pm times, minutes = minutes + ( 12 * 6)
      }
      // 4. Calculate for AM hours and add the hours converted to minutes
      if(time.split(':')[0] !== '12') { // 11:59AM.split(:)[0] and here [0] = 11  time =[11, 59]
         minutes += time.split(':')[0] * 60  // so  minutes = 11 * 60
      }  
      // 5.Calculate for AM minutes and add the minutes . use regex string.mtach(regex) method
      minutes += Number(time.split(':')[1].match(/[0-9][0-9]/)[0]) // here [1] = 59 of time[11]

   //5A. return minutes
      return minutes
  }

 
  
  // 6.loop through the array of events, convert each time to minutes and add to minutes array
  for(let i = 0; i < strArr.length; i++) {
       time1 = strArr[i].split('-')[0] //"09:00AM-10:00AM"
       time2 = strArr[i].split('-')[1] // "10:30AM-12:00PM"
      minArr.push([ParseTime(time1), ParseTime(time2)])
  }    
  
  // 7.sort the array of minutes in ascending order
 //7A. You can skip this step if you want.
  minArr.sort(function(a, b) {
      return a[0] - b[0]
  })
  
  // 8.loop through the sorted array and find the longest free time
  for(let j = 0; j < minArr.length - 1; j++) {
      if(longest < minArr[j + 1][0] - minArr[j][1]) {
          longest = minArr[j + 1][0] - minArr[j][1]
      }
  }
  
  // 9.convert the longest free time to hours and minutes
  let hours = 0
  while(longest >= 60) {
      longest -= 60;
      hours ++
  }
  
  // 10.add a leading zero for (single-digit minutes) and (single-digit) hours
  if(hours.toString().length === 1) {
      hours = "0" + hours   //01:10
  }
  if(longest.toString().length === 1) {
      return hours + ":0" + longest    //00:01
  } else {
      return hours + ":" + longest   //11:59
  }
}

// 11.keep this function call here 
console.log(MostFreeTime(strArr));

//12. OutPut is 00:30
