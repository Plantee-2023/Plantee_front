import React from 'react'
 

const Comm_share = () => {

function clip(){
   var url = '';
   var textarea = document.createElement("textarea");
   document.body.appendChild(textarea);
   url = window.location.href;
   textarea.value = url;
   textarea.select();
   document.execCommand("copy");
   document.body.removeChild(textarea);
   alert("링크가 복사되었습니다. 필요하신 곳에 붙여넣기 하세요!")
};

 
  return (
    < span> 

        <button className='comm_btn'
        onClick={()=>clip()}>URL 복사</button>

    </ span>
  )
}

export default Comm_share