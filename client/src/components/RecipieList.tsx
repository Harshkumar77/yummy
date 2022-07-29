import useRecipies from "../hooks/useRecipies"
import Loader from "./Loader"

export default function RecipieList() {
    const { data: recipies, isLoading } = useRecipies()
    if (isLoading || !recipies) return <Loader />
    return (
        <div className="flex flex-wrap justify-around ">
            {recipies.map(({ name, description, ingredients, timeTaken, cover }) => (
                <RecipieListItem
                    name={name}
                    description={description}
                    ingredients={ingredients}
                    cover={cover}
                    timeTaken={timeTaken}
                />
            ))}
        </div>
    )
}

function RecipieListItem({
    name,
    description,
    ingredients,
    timeTaken,
    cover,
}: RecipieListItemProps) {
    return <div className="p-4 shadow-md m-4 rounded-xl   hover:shadow-2xl">
        <img src={cover} className="w-[20rem] aspect-square object-cover" alt="" />
        <p className="font-semibold">{name}</p>
    </div>
}

interface RecipieListItemProps {
    name: string
    cover: string
    description: string
    ingredients: string[]
    timeTaken: number
}
