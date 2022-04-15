import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import trash  from '../trashcan.png'
import { deleteGroup } from '../features/groups/groupSlice'
import { useSelector } from 'react-redux'


function GroupItem({ group }) {
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
const routeChange = () =>{
  navigate('/groups');
}
  return (
    <div className='group'>
      <button className='classbtn' onClick={routeChange}>
        <h2>
          {group.text}
        </h2>
        <h5>
          {user.name}
        </h5>
      </button>
      <button onClick={() => dispatch(deleteGroup(group._id))} className='close'>
        <img src={trash} height={10} width={10}></img>
      </button>
    </div>
  )
}

export default GroupItem
