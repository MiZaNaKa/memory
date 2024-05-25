import React, {  useEffect,useState,useRef,useReducer } from 'react';


// const MyComponent = ({ value }) => { const [counter] = useState(value); 
//     return <span>{counter}</span>;
// };

// const MyApp = () => {
// const [counter, setCounter] = useState(0); 
// const isVisible=counter!==1;
// alert(isVisible)
// return (
//     <div>
//         <button onClick={()=>setCounter(counter+1)}>ClickMe</button>
//         {isVisible && (
//             <div>
//                 Message 1 is :<MyComponent value={counter}/>
//             </div>
//         )}

        

//         <div style={isVisible ?{display:'block'}:{display:'none'}}>
//             Message 2 is : <MyComponent value={counter}/>
//         </div>
//     </div>
// )
// }

// export default MyApp






// const fetchData = () => new Promise((r) => setTimeout(() => r(Date.now()), 100));
// const MyComponent= () => {
// const [result, setResult] = React.useState(); 
// const data = fetchData().then((value) => 
// setResult(value),

// );
// return (
// <div>
//     {result === data.toString() ? (
//         <div>hello</div>
//         ): (
//         <div>goodBye</div>
//         )
//     }
// </div>
// )}

// export default MyComponent



// let test = 1;

// const MyComponent = ({ render }) => {
//   test = test * 2;
//   if (test >= 3) {
//     return render({ value: test * 2 });
//   }
//   return render({ value: test });
// };

// const MyApp = () => {
//   return (
//     <MyComponent
//       render={({ value }) => {
//         if (value === 0 || value > 12) {
//           return <div>Good morning;</div>;
//         }
//         return <div>Hello;</div>;
//       }}
//     />
//   );
// };

// export default MyApp;





// const App = (props) => {
// const [counter, setCounter] = useState(0); 
// useEffect(
// () => {
// console.log('Hello');
// setCounter(1);
// },
// [props.visible]
// );
// return <div>{counter}</div>;
// };
// export default App



// const myFunction = () => {};
// const MyComponent=() => {
// const [counter, setCounter] = useState(0);
// useEffect(() => {
//     myFunction();
//     setCounter((c) => c + 1);
// });


// return <div>{counter}</div>;
// }
// export default MyComponent



// const MyComponent = () => {
// const ref=useRef();
// useEffect(() => {
//     const value1 = ref.current;
// });

// const value2 = ref.current; 
// return <div ref={ref}></div> 
// };
// export default MyComponent



// const MyComponent = ({ isApple, toggleFruit }) =>
// {
// return (
//     <button onClick={toggleFruit}>
//         {isApple ? 'apple' : 'orange'}
//     </button>
// );
// };
// export default MyComponent




// const withTitle = (C, title = '') => (p) => (
// <>
// {title} {C(p)}
// </>
// );
// export default withTitle





// const MyComponent = () => { 
//     const ref = useRef(); 
//     const Submit = () => {
//         console.log(ref.current.checked);
//         alert(ref.current.checked)
//     };

// return (
//     <>
//         <input type='checkbox' ref={ref} defaultChecked/>
//         <button onClick={Submit}>Submit</button>
//     </>
// );
// };
// export default MyComponent







// const reducer = (state, action) => { 
//     console.log(state)
//     switch (action.type) {
//         case 'append': {
//             state[state.length] = 2;
//             console.log(state)
//             return state;
//         }
//         default: {
//             console.log(state)
//             return state;
//         }
//     }
// };
// const MyComponent = () => {
//     const [arr, dispatch] = useReducer(reducer, [1]);
//     const append = () => dispatch({ type: 'append', value: 2 });
//     return <button onClick={append}>{arr.length}</button> ;
// };
// export default MyComponent



// const Context = React.createContext();
// const Select = (props) => {
// const [current, setCurrent] = useState(''); return (
//     <Context.Provider value={{onClick:setCurrent}}>
//         <input value={current}/>
//         {props.children}
//     </Context.Provider>
// );



// Select.Button = ({ value }) => {
// const { onClick } = useContext(Context);
// return  <button onClick={()=>onClick(value)}>{value}</button>;

// }
// const MyApp = () => {
// return (
//     <Select>
//         <Select.Button value={'Option 1'}/>
//         <Select.Button value={'Option 2'}/>
//     </Select>
// )}
// export default MyApp




// const MyComponent = () => {
//     const [formData, setFormData] = useState({ name: '', email: '' });
  
//     const onChange = (fieldName) => (event) => {
//       setFormData({ ...formData, [fieldName]: event.target.value });
//     };
  
//     return (
//       <div>
//         <input value={formData['name']} onChange={onChange('name')} />
//         {/* Add additional inputs for other fields if needed */}
//       </div>
//     );
// };
  
// export default MyComponent;


// ﻿

// const reducer = (state, action) => {
// switch (action.type) {
// case 'increment': {
// return state + 1;
// }
// case 'double': {
// return state * 2;
// }
// default: {
// return state;
// }
// }
// };
// const MyComponent
// =
// () => {
// const [counter, dispatch] = useReducer (reducer, 0);
// const fire
// () => {
// ['increment', 'double', 'reset', 'increment'].forEach((type) => dispatch({ type }));
// };
// return <button onClick={fire}>{counter}</button>;

﻿

// const Context = createContext('apple'); 
// const MyChild = () => {
// const fruit = useContext(Context);
// return <div>{fruit}</div>;
// const MyParent = () => {
// return (
//  <Context.Provider value={'orange'}>
//     <MyChild/>
//  </Context.Provider>

// );
// export default MyParent

﻿

// const fetchFruits = () => new Promise((resolve) =>
//   setTimeout(() => {
//     resolve(['apple', 'orange']);
//   }, 2000)
// );

// const MyComponent = () => {
//   const [loading, setLoading] = useState(true);
//   const [fruits, setFruits] = useState([]); // Changed initial state to []

//   useEffect(() => {
//     fetchFruits()
//       .then(setFruits)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div>loading</div>;
//   return <div>{fruits.join(',')}</div>;
// };

// export default MyComponent


﻿

// Question
// What is the correct way to call the component Repeater in order to render the component SayHello three times?
// const Repeater = ({ count, children }) => {
//     const array = Array.from(new Array(count));
//     return array.map((_, i) => <div key={i}>{children()}</div>);
// };

// const SayHello = () => <div>Hello</div>;

// export default SayHello


﻿

// const Fruits = (props) => {
//     return (
//       <div>
//         {props.children.map((ChildComponent, index) => (
//           <div key={index}>{ChildComponent}</div>
//         ))}
//       </div>
//     );
//   };
  
//   Fruits.Apple = () => <span>apple</span>;
//   Fruits.Orange = () => <span>orange</span>;
  
//   export default Fruits;

  ﻿

// // Select only one answer
// 1.const MyApp =() => {
// return <Fruits>apple orange</Fruits>;
// }
// 2.const MyApp =() => {
//     return <Fruits children={[Fruits.Apple,Fruits.Orange]}/>;
// }

// 3.const MyApp =() => {
//     return <Fruits Apple='apple' Orange='orange'/>;
// }

// 4.const MyApp =() => {
//     return <Fruits >
//         <Fruits.Apple/>
//         <Fruits.Orange/>
//         </Fruits>
// }

﻿

const MyApp = () => {
    const [fruit, setFruit] = useState('orange');
  
    useEffect(() => {
      setTimeout(() => {
        setFruit('apple');
      }, 2000);
    }, []);
  
    return <div>{ fruit }</div>; // This should return a JSX element, not an object
  };
  
  export default MyApp;









