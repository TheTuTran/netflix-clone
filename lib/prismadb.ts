import { PrismaClient } from '@prisma/client';

// saves prisma client in global file which is not affected by hot reloading
const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prismadb = client

export default client