import { useNavigate } from "react-router-dom"

export default function Recipie({
    id,
    name,
    description,
    ingredients,
    timeTaken,
    cover,
}: RecipieProps) {
    const navigate = useNavigate()
    return <div onClick={() => {
        navigate(`/recipie/${id}`)
    }} className="p-4 shadow-md m-4 rounded-xl   hover:shadow-2xl">
        <img src={cover} className="w-[20rem] aspect-square object-cover" alt="" />
        <p className="font-semibold">{name}</p>
    </div>
}

interface RecipieProps {
    id: string
    name: string
    cover: string
    description: string
    ingredients: string[]
    timeTaken: number
}