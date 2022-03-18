import {useState} from 'react';

import Modal from './Modal';
import Backdrop from './Backdrop';

function Home(props){
    const [showModal, setModal] = useState(false);

    function deleteHandler(){
        setModal(true);

    }
    function closeModal(){
        setModal(false);
    }

   return(

   <div className='card'>
   <h2>{props.text}</h2>
   <div className='actions'>
     <button className='btn' onClick={deleteHandler}>Delete</button>
   </div>
   {showModal && <Modal/>}
    {showModal && <Backdrop onCancel={closeModal}/>}
 </div> 
   );
}
export default Home;