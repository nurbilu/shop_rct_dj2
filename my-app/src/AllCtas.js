import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

const AllCtas = () => {
    let params = useParams();
    const SERVER = "http://127.0.0.1:8000/prods"
    const [prods, setprods] = useState([])
    const [title, settitle] = useState("")
    const [price, setprice] = useState("$")
    const [cat, setcat] = useState(0)
    const [refFlag, setrefFlag] = useState(true)
    useEffect(() => {
        axios.get(SERVER+"?cat=" + params.id).then(res => setprods(res.data))
    }, [params.id , refFlag])

    const add=()=>{axios.post(SERVER, { title, price: price + "$", cat }).then(res => setprods([prods, res.data]))}
    const del = (id) => {axios.delete(SERVER+ "/" +id).then(res => setrefFlag(!refFlag))}
    const upd = () => {axios.put(SERVER+ "/" +prods[0].id, { title, price: price + "$", cat }).then(res => setprods([prods, res.data]))}


    return (
        <div>
            {params.id}
            <hr></hr>
            <button className="btn btn-success">Settle Cart</button>
            <h2>Items count: {prods.length}</h2>
            <hr/>
            <div className="row row-cols-1 row-cols-md-6 g-4">
                {prods.map((prod, ind) =>
                    <div key={ind} className="col"><div className="card">
                        <img className="card-img-top" alt="" src={`https://picsum.photos/50${ind}`} />
                        <div className="card-body">
                            <h5 className="card-title">{prod.title}</h5>
                            <p className="card-text">{prod.id} - {prod.price}</p>
                            <button className="btn btn-danger" onClick={()=>del(prod.id)}>Delete</button>
                            <button className="btn btn-warning" onClick={()=>upd()}>Update</button>
                        </div>
                    </div>
                    </div>
                    
                )}
            </div>
            add new product
            <input type="text" placeholder="title" onChange={(e) => settitle(e.target.value)} />
            <input type="text" placeholder="price" onChange={(e) => setprice(e.target.value)} />
            <input type="text" placeholder="cat" onChange={(e) => setcat(e.target.value)} />
            <button className="btn btn-primary" onClick={add}>Add</button>
            {/* <button className="btn btn-warning" onClick={upd_prod}>Update</button> */}
        </div>
    )
}

export default AllCtas