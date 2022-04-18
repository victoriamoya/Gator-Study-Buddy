import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import trash  from '../trashcan.png'
import { deleteChat } from '../features/chats/chatSlice'
import { useSelector } from 'react-redux'


function ChatItem({ chat }) {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
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
      </button>  
      
        <button onClick={() => dispatch(deleteChat(chat._id))} className='delete'>
        <img src={trash} height={10} width={10}></img>
      </button>
    </div>
  )
}

export default ChatItem