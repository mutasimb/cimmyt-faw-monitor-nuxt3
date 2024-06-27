export const useAdmin = () => {
  const authUser = useAuthUser()

  return computed(() => {
    if (!authUser.value) return false

    return ["Super Admin", "Moderator", "User Manager"].indexOf(authUser.value.role) > -1
  })
}
