import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const[length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
 const[password,setpassword]=useState("")

 //useRef hook
const passwordRef=useRef(null)



 const passwordGenerator= useCallback(()=>{
  let pass=""
  let str=
"  abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
if(numberAllowed) str+="0123456789"
if(charAllowed) str+="!@#$%^&*()_+"

for (let i = 0; i <=length; i++) {
  
  let char=Math.floor(Math.random() *str.length+1);
  pass +=str.charAt(char)
}
setpassword(pass)

 },[length,numberAllowed,charAllowed,setpassword])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
 
const copyPasswordToClipboard =useCallback(() =>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,678)
  window.navigator.clipboard.writeText(password)
},[password])
  return (
    
   <div className=" max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 ">
    <h1 className="text-4xl font-bold text-center my-3 text-white">Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input 
  type="text" 
  value={password}
  className="outline-none w-full py-1 px-3 my-3 rounded-lg placeholder-white text-white bg-amber-500"
  placeholder="password"
  readOnly
  ref={passwordRef} 
/>
<button 
onClick ={copyPasswordToClipboard}
className='outline-none bg-blue-700 text-white px-3 my-3 rounded-lg py-1 hover:bg-blue-100 shrink-0'>copy</button>
    </div>
  <div className='flex text-sm gap-x-2 py-3'>
    <div className='flex items-center gap-x-1'>
      <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
       />
       <label >Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input 
      type="checkbox" 
      defaultchecked={numberAllowed}
      onChange={(e) => setNumberAllowed(e.target.checked)} // Update state correctly
       />
       <label >Numbers</label>

    </div>
    <div className='flex items-center gap-x-1'>
      <input 
      type="checkbox" 
      defaultchecked={charAllowed}
      onChange={(e) => setCharAllowed(e.target.checked)} // Update state correctly
       />
       <label > Characters</label>
    </div>
    </div>  
   </div>
    
  )
}


export default App
