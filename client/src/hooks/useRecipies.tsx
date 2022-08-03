import { QueryClient, QueryKey, useQuery } from "react-query";
import request from "../utils/axios";

const fetchRecipies = ({ queryKey }: any): Promise<Array<{
    _id: string;
    name: string;
    cover: string;
    description: string;
    ingredients: string[];
    timeTaken: number;
    __v: number;
}>> => {
    const [_, searchQuery] = queryKey
    console.log(searchQuery);
    if (searchQuery === "")
        return request.get(`/api/recipies`).then(_ => _.data)
    return request.get(`/api/recipies/search?q=${searchQuery}`).then(_ => _.data)
}

const useRecipies = (searchQuery: string) => useQuery(["recipies", searchQuery], fetchRecipies)

export default useRecipies
