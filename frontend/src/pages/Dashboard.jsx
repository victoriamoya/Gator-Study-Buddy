import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GroupForm from '../components/GroupForm'
import GroupItem from '../components/GroupItem'
import Spinner from '../components/Spinner'
import { getGroups, reset } from '../features/groups/groupSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { groups, isLoading, isError, message } = useSelector(
    (state) => state.groups
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGroups())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Groups Dashboard</p>
      </section>

      <GroupForm/>

      <section className='content'>
        {groups.length > 0 ? (
          <div className='groups'>
            {groups.map((group) => (
              <GroupItem key={group._id} group={group}/>
            ))}
          </div>
        ) : (
          <h3>You haven't created any groups yet!</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
