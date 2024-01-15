
// import React from 'react'
// import Link from "next/link";
// import {useSWR} from "swr";

// const fetcher = (...arg) => fetch(...arg).then((res) => res.json());

// const getUsers = () => {
//   const { data, error } = useSWR("https://fakestoreapi.com/users", fetcher);

//   console.log(data, "----------data-----------");
//   console.log(error, "----------data-----------");
//   return (
//     <>
//       <h2> details of Users</h2>
//       {data && data.map((item) => (
//         <Link href={`/getdata/${item.id}`} key={item.id}>
//           <div>{item.username}</div>
//         </Link>
//       ))}
//     </>
//   );
// };

// export default getUsers;
