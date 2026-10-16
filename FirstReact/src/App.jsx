// import './App.css'
// function App() {

//   const a = 10
//   let user = "john"

//   // Arrow Function
//   const showUser = () => {
//     console.log("hiiie")
//   }

//   const changeUser = () =>{
//     console.log("Username: ",{user})
//     user = "Elena"
//     console.log("Changed Username: ",{user})
//   }
//   showUser()

//   return (
//       <div>
//         <div className='card'>
//           <h1>helloooooooo</h1>
//           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis hic omnis, facere voluptas necessitatibus, excepturi cumque nisi molestiae pariatur ducimus, perferendis repellendus aut? Nihil tempore distinctio sit, dolores dicta ratione.</p>


//           <h1>hello {a}</h1>
//           {/* displays for 2 times because of the strictmode */}
//           <h1>user is {user}</h1>
//           {/* calls automatically without button clicked*/}
//           <button onClick={showUser()}>show user Auto</button>
//           <br />
//           <br /><br />
//           {/* calls when button clicked */}
//           <button onClick={showUser}>show user (when button clicked)</button>

//           <br /><br /><br />
//           <button onClick={changeUser}>Change Username</button> 


//         </div>
//       </div>



//   );
// }

// export default App;


import { useState } from 'react';
import './App.css'
function App() {

  //useState :-- kind of like variables
  // a = readeable & setA = writable
  // a= 10
  const [a, setA] = useState(0)


  return (
    <div>
      <h1>value of a is {a}</h1>
      <button onClick={() => setA(a + 10)}>Increment</button>
      <button onClick={() => setA(a - 10)}>Decrement</button>
    </div>

  );
}

export default App;