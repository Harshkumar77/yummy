import { AiFillDelete, AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai"
import { Link, useNavigate, useParams } from "react-router-dom"
import useRecipie from "../hooks/useRecipie"
import request from "../utils/axios"
import Loader from "./Loader"
import Notfound from "./Notfound"

export default function Recipie() {
    const { id } = useParams<{ id: string }>()
    const { isLoading, data: recipie, error } = useRecipie(id as string)
    const navigate = useNavigate()
    if (isLoading || !recipie)
        return <Loader />
    if (error)
        <Notfound />
    return <div className="text-center max-w-3xl mx-auto mb-[300px]">
        <img src={recipie.cover} className="mx-auto my-2 max-w-[400px] object-cover aspect-square" alt="" />
        <p className="text-5xl m-4 font-bold">{recipie.name}</p>
        <p className="font-medium">
            Time required :{" "}
            <span className="font-bold text-primary">{recipie.timeTaken}</span>
            {" "}mins
        </p>
        {recipie.ingredients.length !== 0 && <p className="font-bold text-2xl m-4">Ingredients</p>}
        <ol type={"1"} >{recipie.ingredients.map((ingredient) => <li>{ingredient}</li>)}</ol>
        <p className="font-medium whitespace-pre-line  m-2 p-2 text-start">{recipie.description}</p>
        <Link to={`/edit/${id}`}>
            <button className="m-4 hover:text-[blue]"><AiTwotoneEdit className="text-4xl mx-auto" /> Edit</button>
        </Link>
        <button className="m-4 hover:text-[red]" onClick={async () => {
            await request.delete(`/api/recipie/${id}`)
            navigate("/")
        }}><AiFillDelete className="text-4xl mx-auto" /> Delete</button>

    </div>

}