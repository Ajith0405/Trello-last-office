import React, { useEffect, useState } from 'react'
import { Board} from '../Types/types'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllBoards = () => {
    const [boards,setBoards] = useState<Board[]>([]);


    useEffect(()=>{
         axios.get('http://localhost:5050/getAllBoards')
        .then((res)=>{
            // console.log(res.data)
            setBoards(res.data);
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[boards])
  return (
    <div>
        {
            boards &&(
                <div className='d-flex'>
                    {boards.slice().reverse().map((board, index)=>(
                        <div key={index} >
                            
                            <Link to={`/board/${board.id}`}>
                            <button  className='btn btn-light text-dark  p-5 my-2 mx-2' >
                                <h1 style={{fontWeight:'800'}}>{board.board_name}</h1> 
                            </button>
                            </Link>
                              
                        </div>
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default AllBoards