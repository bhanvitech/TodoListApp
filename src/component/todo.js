import React, { useState ,useEffect} from 'react'
import "./style.css"
const Todo = () => {

        //get the local storage data back 
        const getLocalData=()=>{
            const lists=localStorage.getItem("mytodolist")
            if(lists){
                return JSON.parse(lists);
            }
            else{
                return [];
            }
        }


    const [inputdata,setInputData]=useState("")//state create krna h jis e kuch todo list me likhe voh value aye
    const [items,setItems]=useState(getLocalData())//isse ek items ke baad kuch or likhne pr array create hoga and plus item hote rhenge
    const [isEditItem,setIsEditItem] =useState("");//edit item usestate
    const [toggleButton,setToggleButton]=useState(false)//to change button if editing
        // add the items function
        const addItem=()=>{
            if(!inputdata)
            {
                alert('please fill the data')
            }
            else if (inputdata && toggleButton)
             {
                setItems(
                  items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                      return { ...curElem, name: inputdata };
                    }
                    return curElem;
                  })
                );
          
                setInputData("");
                setIsEditItem(null);
                setToggleButton(false);
              } 
            else
            {
                const myNewInputData={
                    id: new Date().getTime().toString(),
                    name:inputdata,
                };
                setItems([...items,myNewInputData])//array me add krta jyga
                setInputData("");//input box empty krega after adding
            }
        }

        //edit the items
        const editItem=(index)=>{
                const item_todo_edited=items.find((curElem)=>{
                    return curElem.id=== index;
                });
                setInputData(item_todo_edited.name);
                setIsEditItem(index);
                setToggleButton(true);
        }
       
        // --how to delete item section--
        const deleteItem=(index)=>{
            const updatedItems=items.filter((curElem)=>{  //item hoga usspr loop chlayenge curelem 
                return curElem.id !==index; // agr mera curelem iss index match hota h toh only that eelemnt ko chorh kr baaki return krane h
            })
            setItems(updatedItems)
        };

        //remove all items
        const removeAll=()=>{
            setItems([]);//empty array pass kro all elements will be remove
        }

        //local storage pr data save kren keliye hmare pass hai useEffect hook
        useEffect(()=>{
            localStorage.setItem("mytodolist",JSON.stringify(items))//key value pair me value ati items array h toh json.strinify use krenge
        },[items])

        return (
    <>
      <div className='main-div'>
          <div className='child-div'>
              <figure>
                  <img src='./images/todo.svg' alt='todologo'></img>
                  <figcaption>Add Your List Here ✌</figcaption>
              </figure>
              <div className='addItems'>
                  <input type='text' placeholder='✍ Add Items' 
                  className='form-control'
                  value={ inputdata}
                  onChange={(event)=>setInputData(event.target.value)}
                  />
                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) 
                                                     :
                                        (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }

                    {/* show items */}
                    <div className='showItems'>
                        {items.map((curElem,index)=>
                        
                        <div className='eachItem' key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                                <i className='far fa-edit add-btn' onClick={()=>editItem(curElem.id)}></i>
                                <i className='far fa-trash-alt add-btn' onClick={()=>deleteItem(curElem.id)}></i>
                            </div>
                        </div>
                        )}
                        
                    </div>
            {/* remove all items */}
                <div className='showItems'>
                <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Todo
