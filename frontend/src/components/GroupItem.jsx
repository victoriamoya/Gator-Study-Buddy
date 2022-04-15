import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import trash  from '../trashcan.png'
import { deleteGroup } from '../features/groups/groupSlice'


function GroupItem({ group }) {
  const dispatch = useDispatch()
  let navigate = useNavigate();
const routeChange = () =>{
  let path = '/groups';
  navigate(path);
}
  return (
    <div className='group'>
      <button className='classbtn' onClick={routeChange}>
        <h2>
          {group.text}
        </h2>
      </button>
      <button onClick={() => dispatch(deleteGroup(group._id))} className='close'>
        <img src={trash} height={10} width={10}></img>
      </button>
    </div>
  )
}

export default GroupItem
