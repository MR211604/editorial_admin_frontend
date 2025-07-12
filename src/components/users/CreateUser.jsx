import { useUsers } from "../../hooks/useUsers"

export default function CreateUser() {
  
  const { createUser } = useUsers()
  
  const handleCreateUser = () => {
    const userData = {
      name: 'ejemplo',
      password: 'ejemplopassword'
    }
    createUser(userData)
  }

  return (
    <>
    <div>CreateUser</div>
    <button onClick={handleCreateUser}>Crear Usuario</button>
    </>
  )
}
