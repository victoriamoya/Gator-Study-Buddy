import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGroup } from '../features/groups/groupSlice'
import { useSelector } from 'react-redux'

function GroupForm() {
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
    dispatch(createGroup({ text, latitude, longitude}))
    setText('')
  }

  return (
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='text'>Group Name</label>
            <input
                type='text'
                name='text'
                id='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Create new group
            </button>
          </div>
        </form>
      </section>
  )
}

export default GroupForm
