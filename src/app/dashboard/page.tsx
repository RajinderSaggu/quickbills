import { requiredUser } from '@/hooks/requiredUser';
import React from 'react'
import { getUser } from '../axtions';



const Dashboard = async () => {
  const session = await requiredUser();
  const data = await getUser(session?.user?.id as string);
  return (
    <><div>
      Hello from dashboard
    </div>

    </>
  )
}

export default Dashboard;
