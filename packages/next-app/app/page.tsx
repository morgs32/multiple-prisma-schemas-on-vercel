import { revalidatePath } from 'next/cache'
import { createPost, getPosts } from 'posts'
import { createUser, getUsers } from 'users'

export default async function Home() {

  const users = await getUsers()
  const posts = await getPosts()

  async function createUserAction(formData: FormData) {
    'use server'
    await createUser()
    revalidatePath('/')
  }
 
  async function createPostAction(formData: FormData) {
    'use server'
    await createPost()
    revalidatePath('/')
  }
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          Users
          {' '}
          <form action={createUserAction} className="inline">
            <button className="cursor-pointer underline">
              Create user
            </button>
          </form>
        </div>
        {users.map((user) => (
          <>
            {user.id}
          </>
        ))}
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          Posts
          {' '}
          <form action={createPostAction} className="inline">
            <button className="cursor-pointer underline">
              Create post
            </button>
          </form>
        </div>
        {posts.map((post) => (
          <>
            {post.id}
          </>
        ))}
      </div>
    </main>
  )
}
