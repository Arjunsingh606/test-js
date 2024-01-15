const fetchData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await res.json();
  console.log(data, "api data")
  return data.result;
};

export default async function getUser(params){
    const user = await fetchData(params.id);
    console.log(user);
    return (
        <>
        <h2>Users:{user.name}</h2>
        
        
        </>
    )
}