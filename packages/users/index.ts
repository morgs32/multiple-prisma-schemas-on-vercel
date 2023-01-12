import { PrismaClient, Prisma } from 'myprisma/users';

export {
  Prisma as IApiPrisma,
}
export const users = new PrismaClient()

export function createUser() {
  return users.user.create({
    data: {}
  })
}

export function getUsers() {
  return users.user.findMany()
}