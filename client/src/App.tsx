import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import Landing from "./components/Landing"
import { createContext, useState } from "react"
import request from "./utils/axios"
import Loader from "./components/Loader"
import DashBoard from "./components/DashBoard"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Notfound from "./components/Notfound"

const queryClient = new QueryClient()

const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : new URL(window.location.href).origin

export const GlobalContext = createContext<{
  BASE_URL: string
}>(undefined!)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContext.Provider value={{ BASE_URL }}>
          <Body />
        </GlobalContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function Body() {
  const { isLoading, data, error, isError } = useQuery(
    "user",
    () => request.get("/auth/user").then((_) => _.data),
    {
      retry: 0,
    }
  )
  if (isLoading) return <Loader />
  if (isError) return <Landing />
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

export default App
