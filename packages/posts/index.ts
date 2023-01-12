import { PrismaClient } from 'myprisma/posts'

export const posts = new PrismaClient()

export function createPost() {
  return posts.post.create({
    data: {},
  })
}

export function getPosts() {
  return posts.post.findMany()
}