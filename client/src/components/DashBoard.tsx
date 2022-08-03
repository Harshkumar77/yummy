import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import RecipieList from "./RecipieList";

export default function DashBoard() {
  const [searchQuery, setSearchQuery] = useState("")
  return <>
    <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <RecipieList searchQuery={searchQuery} />
  </>
}