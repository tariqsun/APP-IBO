import moment from 'moment/moment'
import React from 'react'

function DateDiff({ to }) {
  let current = moment();
  let toDate = moment(to);
  let due_days = toDate.diff(current, 'days');
  let className = '';

   if(due_days <= 15){
    className = 'bg-green-700 text-gray-100';
   }else if(due_days <= 10){
    className = 'bg-orange-700 text-gray-100';
   }
   else if(due_days <= 5){
    className = 'bg-red-700 text-gray-800';
   }
   else{
    className = 'bg-green-800 text-gray-100';
   }

  return (
    <>
       <span className={`py-1 px-4 rounded-3xl ${className}`}>{due_days}</span>
    </>
  )
}

export default DateDiff
