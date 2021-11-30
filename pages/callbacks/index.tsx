import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { parseCookies, setCookie, destroyCookie } from "nookies"

interface GoogleCallbacks {
  code: string
}
function setGoogleCookie(cookie: string) {
  // Simply omit context parameter.
  // Parse
  const cookies = parseCookies()
  console.log({ cookies })

  // Set
  setCookie(null, "g", cookie, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  })

  // Destroy
  // destroyCookie(null, 'cookieName')
}
const cekAdmin = async (code: string) => {
  try {
    const response = await fetch("http://localhost:3000/callbacks?code=" + code)
    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}
const Callbacks: NextPage = () => {
  const [admin, setAdmin] = useState({})
  const router = useRouter()
  const code = router.query.code
  useEffect(() => {
    if (typeof router.query.code === "string")
      cekAdmin(router.query.code).then((v) => {
        if (v.admin) {
          setGoogleCookie(router.query.code as string)
        }
        setAdmin(v)
      })
  }, [router])

  return <>{JSON.stringify(admin)}</>
}

export default Callbacks
