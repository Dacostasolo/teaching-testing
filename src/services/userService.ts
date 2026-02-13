export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

export interface CreateUserDTO {
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}


export async function fetchUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`)
  }

  const data = await response.json()

  return data.slice(0, 5).map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'user' as const,
  }))
}


export async function fetchUserById(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

  if (!response.ok) {
    throw new Error(`User not found: ${id}`)
  }

  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: 'user',
  }
}


export async function createUser(userData: CreateUserDTO): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Validate input
  if (!userData.name || !userData.email) {
    throw new Error('Name and email are required')
  }

  // Simulate API call
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error('Failed to create user')
  }

  const data = await response.json()

  return {
    id: data.id,
    ...userData,
  }
}


export async function deleteUser(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 50))

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${id}`)
  }
}
