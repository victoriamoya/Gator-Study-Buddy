import { useDispatch } from 'react-redux'
import { deleteGroup } from '../features/groups/groupSlice'

function GroupItem({ group }) {
  const dispatch = useDispatch()
  return (
    <div className='group'>
      <h2>{group.text}</h2>
      <button onClick={() => dispatch(deleteGroup(group._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GroupItem
