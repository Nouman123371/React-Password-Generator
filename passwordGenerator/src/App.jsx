// <<<<---------------------Password Generator-------------------------->>>>

import {useState, useCallback, useEffect,useRef} from 'react'
function App() {
 const [length,setLength]=useState(8);
 const [isNumbersAllowed,setNumbersAllowed]=useState(false);
 const [isCharsAllowed,setCharsAllowed]=useState(false);
 const [password,setPassword]=useState("");

 let passwordRef=useRef(null);

const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,password.length)
  window.navigator.clipboard.writeText(password);
  // alert("Password copied!");
},[password])

 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(isNumbersAllowed) str+= "123456789"
  if(isCharsAllowed) str+= "!@#$%^&*()"

  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char);
  }
  setPassword(pass);
 }
 ,[length,isNumbersAllowed,isCharsAllowed,setPassword])

 useEffect(()=>{
  passwordGenerator()}
  ,[length,isNumbersAllowed,isCharsAllowed,passwordGenerator]);
  return (
    <>
     <div className='flex justify-center mt-60'>
      <div className='flex flex-col justify-center items-center bg-slate-800 w-auto h-auto rounded-xl p-8 '>
        <h1 className='text-white text-2xl font-semibold '>Password Generator</h1>
        <div className='overflow-hidden bg-white mt-6 rounded-lg '>
          <input className='
          w-100 h-8 ml-4 text-xl text-orange-400 outline-none' 
          type="text" readOnly placeholder='password' value={password}
          ref={passwordRef}/>
          <button className='bg-blue-600 text-white font-semibold h-full px-4 py-2 cursor-pointer hover:bg-blue-900'
          onClick={(copyPasswordToClipBoard)}>copy</button>
        </div>
        <div className='mt-6 flex w-120'>
          <input 
          type="range" min='8' max='100' value={length} 
          className='accent-blue-500 cursor-pointer' 
          onChange={(e)=>setLength(e.target.value)}/>
          <label className='text-orange-400 ml-2 '>Length: {length}</label>
          <input className='ml-2 accent-blue-500 cursor-pointer' type="checkbox" value={isNumbersAllowed} 
          onChange={()=>{setNumbersAllowed(permission => !permission)}}/>
          <label className='text-orange-400 ml-2 '>Numbers </label>
          <input className='ml-2 accent-blue-500 cursor-pointer' type="checkbox" value={isCharsAllowed}  
          onChange={() => setCharsAllowed(permission => !permission)}/>
          <label className='text-orange-400 ml-2 '>Characters </label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
