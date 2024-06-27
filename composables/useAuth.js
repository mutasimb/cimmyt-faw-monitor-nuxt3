import { useAuthUser } from "./useAuthUser";

export default () => {
  const
    authUser = useAuthUser(),
    setUser = user => { authUser.value = user },
    setCookie = cookie => { cookie.value = cookie },

    login = async (phone, password) => {
      const data = await $fetch("/auth/login", { method: "POST", body: { phone, password } })

      setUser(data.user)

      return authUser
    },

    logout = async () => {
      const data = await $fetch("/auth/logout", { method: "POST" })

      setUser(data.user)
    },

    me = async () => {
      if (!authUser.value) {
        try {
          const data = await $fetch("/auth/me", { headers: useRequestHeaders(["cookie"]) })
          setUser(data.user)
        } catch (error) {
          setCookie(null)
        }
      }

      return authUser
    }

  return { login, logout, me }
}
