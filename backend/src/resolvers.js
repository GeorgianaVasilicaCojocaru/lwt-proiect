require('dotenv').config()


const jwt = require('jsonwebtoken')
const prisma = require("./prismaClient")
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET

const labelToEnum = {
  Playing: 'playing',
  Finished: 'finished',
  'Plan to Play': 'plan_to_play',
  'On Hold': 'on_hold',
  Dropped: 'dropped',
}

module.exports = {
  Query: {
    // All games by user
    games: async(_,__,context) =>{
      if (!context.user) throw new Error("Not authenticated")
      return prisma.game.findMany({
        where: {ownerId:context.user.id},
        include: { owner: true },
      })
    },

    // Specific game by user
    game:  async (_, { id },context) =>
    {
      if (!context.user) throw new Error("Not authenticated")
      return prisma.game.findUnique({
        where: { id: Number(id), ownerId:context.user.id },
        include: { owner: true },
      })
    },

    // By genre + by user
    gamesByGenre: async (_, { genre },context) =>{

      if (!context.user) throw new Error("Not authenticated")
      return prisma.game.findMany({
        where: { genre, ownerId:context.user.id  },
        include: { owner: true },
      })
    },

    // By platform + by user
    gamesByPlatform: async (_, { platform },context) =>{

      if (!context.user) throw new Error("Not authenticated")
      return prisma.game.findMany({
        where: { platform,ownerId:context.user.id },
        include: { owner: true },
      })
    },

    // By status + by user
    gamesByStatus: async (_, { status },context) => {

      if (!context.user) throw new Error("Not authenticated")
      
      //const prismaStatus = status ? labelToEnum[status] : null

      return prisma.game.findMany({
        where: { status,ownerId:context.user.id },
        include: { owner: true },
      })
    },


    // Paginare
    paginatedGames: async (_, { page, limit },context) => {
      
      if (!context.user) throw new Error("Not authenticated")
      const skip = (page - 1) * limit

      const [items, totalCount] = await Promise.all([
        prisma.game.findMany({
          where: { ownerId: context.user.id },
          skip,
          take: limit,
          include: { owner: true }
        }),
        prisma.game.count({
          where: { ownerId: context.user.id },
        }),
      ])
      return {
        items,
        page,
        limit,
        totalCount,
        hasNextPage: skip + limit < totalCount,
      }
      /*
      
      return prisma.game.findMany({
        where: { ownerId:context.user.id },
        skip,
        take: limit,
        include: { owner: true },
      })
      */

    },
  },

  Mutation: {
    // Register
    registerUser: async (_, { input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: input.username },
      })
      if (existingUser) {
        throw new Error("Username already exists")
      }

      const hashedPassword = await bcrypt.hash(input.password, 10)

      return prisma.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
        },
      })
    },

    // Login 
    login: async (_, { input }) => {
      const user = await prisma.user.findUnique({
        where: { username: input.username },
      })
      if (!user) throw new Error("User not found")

      const valid = await bcrypt.compare(input.password, user.password)
      if (!valid) throw new Error("Incorrect password")
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' })
      return token
    },

    addGame: async (_, { input },context) => {
      if (!context.user) throw new Error('Not authenticated')
      return prisma.game.create({
        data: {
          ...input,
          ownerId: context.user.id,
        },
        include: { owner: true },
      })
    },

    updateGame: async (_, { id, input },context) => {
      if (!context.user) throw new Error('Not authenticated')

      const game = await prisma.game.findFirst({ 
        where: { 
          id: Number(id),
          ownerId:context.user.id
        }
      })
      if (!game) throw new Error("Game not found")

      return prisma.game.update({
        where: { id: Number(id) },
        data: { ...input },
        include: { owner: true },
      })
    },


    deleteGame: async (_, { id },context) => {
      if (!context.user) throw new Error('Not authenticated')

      const game = await prisma.game.findFirst({
        where:
        { id: Number(id),
          ownerId:context.user.id
        }
      })
      if (!game) throw new Error("Game not found")

      await prisma.game.delete({ where: { id: Number(id) } })
      return true
    },
  },

  Game: {
    owner: game =>
      prisma.user.findUnique({
        where: { id: game.ownerId },
      }),
  },
}
