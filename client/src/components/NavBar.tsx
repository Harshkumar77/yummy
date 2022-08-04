import { useState } from "react"
import { Link } from "react-router-dom"

export default function NavBar({ searchQuery, setSearchQuery }: NavBarProps) {
    return (
        <nav className="flex items-center justify-center">
            <input
                className="p-4 m-2 text-xl rounded-3xl min-w-[400px] outline-none bg-secondary font-bold"
                type="search"
                placeholder="Search for recipies here"
                onChange={({ currentTarget }) => {
                    setSearchQuery(currentTarget.value)
                }}
                value={searchQuery}
            />
            <Link to="/new" className="">
                <button className="p-4 m-4 rounded-3xl font-bold  bg-primary text-filler text-lg">
                    Add New Recipie Here
                </button>
            </Link>
        </nav>
    )
}
interface NavBarProps {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}
