export type UsersProps = {
  updateSearchString: (e: any) => void
  handleSearchCall: (n: number) => void
  handleKeyPressSearchCall: (e: any) => void
  setPage: (n: number) => void
  setShowErrorModal: (error: boolean) => void
  currentPage: number
  users: Users
  error: boolean
}

export type UserCardProps = {
  user: any
  setShowModal: any
  showModal: boolean
}

type Users = {
  items: any[]
  total_count: number
  avatar_url: string
  followers_url: string
  starred_url: string
}
