import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function CountryDetail(){

    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        async function getData(){
            let data = await fetch(`http://localhost:3001/countries/${id}`);
            data = await data.json();
            console.log(data);
            setData(data);
        }
        getData();
    },[]);

    return <div>
        <p>{data.name}</p>
    </div>
}

export default CountryDetail;