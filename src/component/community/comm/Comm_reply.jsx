import React from 'react'
import { Table } from 'react-bootstrap'

import axios from 'axios';
import react, { useEffect, useState } from 'react'
 



const Comm_Reply = ({post_id}) => {
 
    const [list, setList] = useState([]);
    const [total, setTotal]= useState(0);
    const size=5;
    const page=1;
   
   
  
    const getComent = async() => {
      
      const res=await axios(`/comments/c_list.json?page=${page}&size=${size}&post_id=${post_id}`);
       
  
      console.log("comments",res);
      
      //let data=res.data.c_list.map(r=>r && {...r, ellipsis:true, view:true, text:r.contents});
      setList(res.data.list);
      
     //setTotal(res.data.c_total);
  
      
    }

    

    useEffect(() => {
        getComent();
      }, []);


      return (
 
        <>
      
        {list.map(c=>


    <tr key={c.coment_id}>
    
             <td>check</td>
              <td>d</td>
              <td>답변</td>
              <td>{c.title}</td>
              <td>지역</td>
              <td>{c.uid}({c.nickname})</td>
              <td>추천</td>
              <td>조회</td>
              <td>{c.reg_date}</td>
             

    </tr>
      
      )}
    
 
    
</>
 
  )
}

export default Comm_Reply