import { Link } from "react-router-dom";
import RecipieList from "./RecipieList";

export default function DashBoard() {
  return <>
    <Link to="/new">
      <button className="p-4 m-4 rounded-md font-medium bg-primary text-filler text-3xl">
        New Recipie
      </button>
    </Link>
    <RecipieList />
  </>
}