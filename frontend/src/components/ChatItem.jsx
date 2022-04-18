import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import trash  from '../trashcan.png'
import { deleteChat } from '../features/chats/chatSlice'
import { useSelector } from 'react-redux'


function ChatItem({ chat }) {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
<<<<<<< HEAD

  return (
    <div className='chat'>
      <button className='message'>
        {chat.text}
        <h6>
          {chat.name}
        </h6>
        <div>{new Date(chat.createdAt).toLocaleString('en-US')}</div>
=======
const routeChange = () =>{
  navigate('/login');
}
  return (
    <div className='chat'>
        <button className='message'>
        
          {chat.text}
      
        <h6>
          {chat.name}
        </h6>
>>>>>>> 5f468920e8bcd3251105192e60953e22e57fd061
      </button>  
      
        <button onClick={() => dispatch(deleteChat(chat._id))} className='delete'>
        <img src={trash} height={10} width={10}></img>
      </button>
    </div>
  )
}

export default ChatItem