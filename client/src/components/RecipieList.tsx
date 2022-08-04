import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useRecipies from "../hooks/useRecipies"
import Loader from "./Loader"

export default function RecipieList({ searchQuery }: { searchQuery: string }) {
    const { data: recipies, isLoading } = useRecipies(searchQuery)
    return (
        <div>
            <div>
            </div>
            {recipies && <div className="flex flex-wrap justify-around ">
                {recipies.map(({ name, description, ingredients, timeTaken, cover, _id }) => (
                    <RecipieListItem
                        name={name}
                        description={description}
                        ingredients={ingredients}
                        cover={cover}
                        timeTaken={timeTaken}
                        id={_id}
                    />
                ))}
            </div>}
        </div>
    )
}

function RecipieListItem({
    name,
    description,
    ingredients,
    timeTaken,
    cover,
    id
}: RecipieListItemProps) {
    const navigate = useNavigate()
    return <div onClick={() => {
        navigate(`/recipie/${id}`)
    }} className="p-4 shadow-md m-4 rounded-xl bg-[white]   hover:shadow-2xl">
        <img src={cover} className="w-[20rem] aspect-square object-cover" alt="" />
        <p className="font-semibold m-2">{name}</p>
    </div>
}

interface RecipieListItemProps {
    name: string
    cover: string
    description: string
    ingredients: string[]
    timeTaken: number
    id: string
}
