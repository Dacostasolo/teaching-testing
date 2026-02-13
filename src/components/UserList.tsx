
import { useState, useEffect } from 'react'
import { fetchUsers, deleteUser, User } from '../services/userService'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      setDeleteError(null)
      await deleteUser(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete user')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <div data-testid="loading">Loading users...</div>
  }

  if (error) {
    return (
      <div data-testid="error">
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={loadUsers} data-testid="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  if (users.length === 0) {
    return <div data-testid="empty">No users found</div>
  }

  return (
    <div data-testid="user-list">
      <h2>Users</h2>
      {deleteError && (
        <div data-testid="error" style={{ marginBottom: '1rem' }}>
          <p style={{ color: 'red' }}>Error: {deleteError}</p>
        </div>
      )}
      <ul>
        {users.map((user) => (
          <li key={user.id} data-testid={`user-${user.id}`}>
            <span>{user.name}</span> - <span>{user.email}</span>
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deletingId === user.id}
              data-testid={`delete-btn-${user.id}`}
            >
              {deletingId === user.id ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
