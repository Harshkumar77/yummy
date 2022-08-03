import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useState } from "react"
import { storage } from "../firebase"
import request from "../utils/axios"
import { onValueChangeHandlerRecipie } from "../utils/handler"

export default function NewRecipie() {
    const [userInput, setUserInput] = useState({
        name: "Name of the recipie",
        cover: "/assets/default.jpg",
        description: "Add steps here",
        ingredients: [],
        timeTaken: 10,
    })

    return (
        <div className="text-2xl flex flex-col">
            <CoverUploader userInput={userInput} setUserInput={setUserInput} />
            <input
                className=" p-2 border-primary border outline-none"
                type="text"
                value={userInput.name}
                onChange={onValueChangeHandlerRecipie(setUserInput, "name")}
            />
            <textarea
                className=" whitespace-pre p-2 border-primary border outline-none"
                value={userInput.description}
                onChange={onValueChangeHandlerRecipie(setUserInput, "description")}
            />
            <input
                className=" p-2 border-primary border outline-none"
                type={"number"}
                value={userInput.timeTaken}
                onChange={onValueChangeHandlerRecipie(setUserInput, "timeTaken")}
            />
            <IngredientsInput userInput={userInput} setUserInput={setUserInput} />
            <button
                onClick={async () => {
                    await request
                        .post("/api/recipie/add", userInput)
                        .then(({ data }) => console.log(data))
                }}
            >
                Done
            </button>
        </div>
    )
}

function IngredientsInput({ userInput, setUserInput }: any) {
    return (
        <>
            <p>click + button to add ingredients</p>
            <div className="flex flex-wrap">
                {userInput.ingredients.map((ingredient: string, i: number) => (
                    <div className="text-lg p-2 ">
                        <input
                            className="outline outline-primary outline-1 p-2"
                            type="text"
                            value={ingredient}
                            onChange={({ currentTarget: { value } }) =>
                                setUserInput((initial: any) => {
                                    const n = initial.ingredients
                                    n[i] = value
                                    return { ...initial, ingredients: n }
                                })
                            }
                        />
                        <button
                            onClick={() =>
                                setUserInput((initial: any) => {
                                    let n = [...initial.ingredients]
                                    n.splice(i, 1)
                                    return { ...initial, ingredients: n }
                                })
                            }
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => {
                        setUserInput((initial: any) => {
                            return {
                                ...initial,
                                ingredients: [...initial.ingredients, ""],
                            }
                        })
                    }}
                >
                    +
                </button>
            </div>
        </>
    )
}

function CoverUploader({ userInput, setUserInput }: any) {
    return (
        <>
            <img src={userInput.cover} alt="" />
            {userInput.cover === "/assets/default.jpg" && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={async ({ currentTarget }) => {
                        const imgLocalUrl = URL.createObjectURL(currentTarget.files![0])
                        const firebaseRef = ref(storage, `recipie/${crypto.randomUUID()}`)
                        await uploadBytes(firebaseRef, currentTarget.files![0])
                        setUserInput({ ...userInput, cover: await getDownloadURL(firebaseRef) })
                    }}
                />
            )}
        </>
    )
}

interface IngredientsInput {
    ingredients: string[]
    setUserInput: any
}
