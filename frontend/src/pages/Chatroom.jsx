import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getChats, reset } from '../features/chats/chatSlice'
import ChatForm from '../components/ChatForm'
import ChatItem from '../components/ChatItem'

function Chatroom() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { chats, isLoading, isError, message } = useSelector(
<<<<<<< HEAD
      (state) => state.chats
=======
    (state) => state.chats
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getChats())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
<<<<<<< HEAD
      <>

        <section className='heading'>
          <h1>Begin Chatting!</h1>
        </section>

        <section className='content'>
          {chats.length > 0 ? (
              <div className='chats'>
                {chats.map((chat) => (
                    <ChatItem key={chat._id} chat={chat}/>
                ))}
              </div>
          ) : (
              <h3>No messages yet!</h3>
          )}
        </section>

        <ChatForm/>
      </>
=======
    <>

      <section className='heading'>
        <h1>Begin Chatting!</h1>
      </section>

      <section className='content'>
        {chats.length > 0 ? (
          <div className='chats'>
            {chats.map((chat) => (
              <ChatItem key={chat._id} chat={chat}/>
            ))}
          </div>
        ) : (
          <h3>No messages yet!</h3>
        )}
      </section>
      
      <ChatForm/>
    </>
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
  )
}

export default Chatroom