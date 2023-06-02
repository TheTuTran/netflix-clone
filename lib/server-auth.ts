import { NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb';


const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});

    // checks if session, user, or email does not exist
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }
    
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });
      
    if (!currentUser) {
        throw new Error('Not signed in');
    }
    
    return { currentUser };
}
    
export default serverAuth;