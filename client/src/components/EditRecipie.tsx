import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react"
import { storage } from "../firebase"
import request from "../utils/axios"
import { onValueChangeHandlerRecipie } from "../utils/handler"
import { useNavigate, useParams } from "react-router-dom";
import useRecipie from "../hooks/useRecipie";
import Loader from "./Loader";

export default function EditRecipie() {
    const { id } = useParams<{ id: string }>()
    const { isLoading, data } = useRecipie(id as string)
    if (isLoading)
        <Loader />
    const [userInput, setUserInput] = useState(data!)
    const navigate = useNavigate()

    return (
        <div className=" max-w-[750px] mx-auto text-md flex flex-col">
            <CoverUploader userInput={userInput} setUserInput={setUserInput} />
            <input
                className="m-2 p-2 border-primary border rounded-lg outline-none"
                type="text"
                value={userInput.name}
                onChange={onValueChangeHandlerRecipie(setUserInput, "name")}
            />
            <div className="m-2 p-2 flex items-center">
                <p>Time required :</p>
                <input
                    className="w-[8ch] m-2 text-center p-2 border-primary rounded-lg border outline-none"
                    type={"number"}
                    min="1"
                    value={userInput.timeTaken}
                    onChange={onValueChangeHandlerRecipie(setUserInput, "timeTaken")}
                />
                <p>minutes</p>
            </div>
            <IngredientsInput userInput={userInput} setUserInput={setUserInput} />
            <textarea
                className="m-2 whitespace-pre-line p-2 h-[300px] border-primary border rounded-lg outline-none"
                value={userInput.description}
                onChange={onValueChangeHandlerRecipie(setUserInput, "description")}
            />
            <button
                onClick={async () => {
                    if (userInput.ingredients.filter((_) => _ === "").length !== 0) {
                        alert("Dont add empty ingredients")
                        return
                    }
                    await request
                        .put(`/api/recipie/${id}`, userInput)
                    navigate(`/recipie/${id}`)
                }}
                className="p-2 text-xl bg-primary text-[white] font-bold m-2 rounded-lg"
            >
                Done
            </button>
        </div>
    )
}

function IngredientsInput({ userInput, setUserInput }: any) {
    return (
        <>
            <div className="m-2 p-2 flex flex-wrap items-center">
                <p>Ingredients :</p>
                {userInput.ingredients.map((ingredient: string, i: number) => (
                    <div className=" p-2 flex items-center">
                        <input
                            className="outline outline-primary rounded-lg text-center outline-1 p-2"
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
                            <TiDeleteOutline className="text-3xl hover:text-[red]" />
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
                    <AiOutlinePlusCircle className="text-3xl hover:text-[blue]" />
                </button>
            </div>
        </>
    )
}

function CoverUploader({ userInput, setUserInput }: any) {
    return (
        <div className="text-center m-2 p-2">
            <img src={userInput.cover} className="w-2/5 p-2 mx-auto aspect-square object-cover" />
            {/* {userInput.cover === "/assets/default.jpg" && (
                <div className="m-2 p-2 flex items-center justify-around">
                    <p>Add picture of recipie here :</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={async ({ currentTarget }) => {
                            const firebaseRef = ref(storage, `recipie/${crypto.randomUUID()}`)
                            await uploadBytes(firebaseRef, currentTarget.files![0])
                            setUserInput({ ...userInput, cover: await getDownloadURL(firebaseRef) })
                        }}
                    />
                </div>
            )} */}
        </div>
    )
}

interface IngredientsInput {
    ingredients: string[]
    setUserInput: any
}
