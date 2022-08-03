import { useState } from "react"
import { Link } from "react-router-dom"

export default function NavBar({ searchQuery, setSearchQuery }: NavBarProps) {
    return <nav>
        <input className="" type="search" onChange={({ currentTarget }) => {
            setSearchQuery(currentTarget.value)
        }} value={searchQuery} />
        <Link to="/new" className="mx-auto ">
            <button className="p-4 m-4 rounded-md font-medium bg-primary text-filler text-3xl">
                New Recipie
            </button>
        </Link>

    </nav>

}
interface NavBarProps {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}