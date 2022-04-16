import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createChat } from '../features/chats/chatSlice'
import { useSelector } from 'react-redux'

function ChatForm() {
  const [text, setText] = useState('')
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  
  navigator.geolocation.getCurrentPosition(
      function success(position) {
        // location obtained
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      },
      function error(error_message) {
        console.error('An error occurred while attempting to retrieve geolocation', error_message)
      }
  )

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createChat({ text, latitude, longitude}))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-chat'>
          <label htmlFor='text'>Enter Message Here:</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-chat'>
          <button className='btn btn-block' type='submit'>
            Send
          </button>
        </div>
      </form>
    </section>
  )    
}

export default ChatForm
