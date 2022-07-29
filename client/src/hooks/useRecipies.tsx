import { useQuery } from "react-query";
import request from "../utils/axios";

const fetchRecipies = (): Promise<Array<{
    _id: string;
    name: string;
    cover: string;
    description: string;
    ingredients: string[];
    timeTaken: number;
    __v: number;
}>> =>
    request.get("/api/recipies").then(_ => _.data)

const useRecipies = () => useQuery("recipies", fetchRecipies)

export default useRecipies
