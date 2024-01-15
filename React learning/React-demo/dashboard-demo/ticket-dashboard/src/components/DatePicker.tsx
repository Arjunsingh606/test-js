// import React, {useState} from 'react';
// import DatePicker from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css'


// const DatePicker =()=> {
//   const [date, setDate] = useState<string>(new Date());
//   const [startDate, setStartDate] = useState<string>();
//   const [endDate, setEndDate] = useState<string>();

//   return (
//     <div>
//       <DatePicker
//         selectsStart
//         selected={startDate}
//         onChange={date => setStartDate(date)}
//         startDate={startDate}
//       />
//       <DatePicker
//         selectsEnd
//         selected={endDate}
//         onChange={date => setEndDate(date)}
//         endDate={endDate}
//         startDate={startDate}
//         minDate={startDate}
//      />
//     </div>
//   );
// }
// export default DatePicker;