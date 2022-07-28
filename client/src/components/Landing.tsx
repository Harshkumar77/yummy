export default function Landing() {
    return (
        <>
            <About />
            <GoogleButton />
        </>
    )
}

function About() {
    return <div className="sm:bg-opacity-100 bg-opacity-20 backdrop-blur-md max-w-[800px] md:mx-auto bg-secondary p-10 rounded-xl m-10">
        <p className="text-2xl md:text-4xl text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, labore!</p>
    </div>
}

function GoogleButton() {
    const authUrl =
        process.env.NODE_ENV === 'development' ? 'http://localhost:8080/auth/google' : '/auth/google'
    return <a href={authUrl}>
        <div className="flex bg-secondary rounded-xl justify-center p-4 
            max-w-[800px] md:mx-auto items-center m-10 hover:outline outline-primary cursor-pointer">
            <img className="w-10 aspect-square mr-2" src="/assets/google_icon.png" />
            <p className="text-white inline font-semibold">Continue with Google</p>
        </div>
    </a>
}
