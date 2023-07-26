import React from 'react'
import './style.css'

const getlocaldata = ()=>
{
  const lists = localStorage.getItem("todolist");
  if(lists)
  {
    return JSON.parse(lists);
  } else{
    return [];
  }
}

const To_Do = () => {
  const [inputdata,setinputdata] = React.useState("");
  const [items,setitems] = React.useState(getlocaldata());
  const [edititems,setedititem] = React.useState("");
  const [toggle,settoggle] = React.useState(false);

  const addItems = ()=>
  {
    if(!inputdata) alert("Input field is required!");
    else if(inputdata && toggle)
    {
      setitems(
        items.map((curele)=>{
        if(curele.id === edititems)
        {
          return {...curele,name:inputdata};
        }
        return curele;
      })
      );

      setinputdata("");
      setedititem(null);
      settoggle(false);
    }
    else{
      const mydata = {
        id: new Date().getTime().toString(),
        name:inputdata
      }
      setitems([...items,mydata]);
      setinputdata("");
    }
  }

  const removeall = ()=>
  {
    setitems([]);
  }

  const edititem = (index)=>
  {
    const edit = items.find((curele)=> {
      return curele.id === index;
    });
    setinputdata(edit.name);
    setedititem(index);
    settoggle(true);
  }

  const deleteitem = (index)=>
  {
      const updateitem = items.filter((curele)=>
      {
        return curele.id !== index;
      });
      setitems(updateitem);
  }

  React.useEffect(()=>{
    localStorage.setItem("todolist",JSON.stringify(items));
  }, [items]);
  return (
    <>
        <div className="main">
            <div className="image">
                <img src="/Images/list.png" alt="List" />
                <h3>Add your list here 🤘</h3>
            </div>
            <div className="input-control">
                <input type="text" placeholder='📒 Add item' required value={inputdata} onChange={(event)=> {setinputdata(event.target.value)}}/>
                {toggle?(<button className='todo-btn' onClick={addItems}>-</button>):(<button className='todo-btn' onClick={addItems}>+</button>)}
            </div>

            <div className='show'>
                {items.map((curele)=>{
                    return (
                      <div className="items" key={curele.id}>
                        <h3>{curele.name}</h3>
                        <button className='edit' onClick={()=> {edititem(curele.id)}}>✏️</button>
                        <button className='delete' onClick={()=> {deleteitem(curele.id)}}>❎</button>
                      </div>
                    )
                })}
            </div>

            <div className="del">
              <button className='chk' onClickCapture={()=> {removeall()}}>✅ Check List</button>
            </div>
        </div>
    </>
  )
}

export default To_Do