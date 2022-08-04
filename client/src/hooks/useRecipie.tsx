import { QueryClient, QueryKey, useQuery } from "react-query";
import request from "../utils/axios";

const fetchRecipie = ({ queryKey }: any): Promise<{
    _id: string;
    name: string;
    cover: string;
    description: string;
    ingredients: string[];
    timeTaken: number;
    __v: number;
}> => {
    const [_, id] = queryKey
    return request.get(`/api/recipie/${id}`).then(_ => _.data)
}

const useRecipie = (searchQuery: string) => useQuery(["recipie", searchQuery], fetchRecipie)

export default useRecipie
