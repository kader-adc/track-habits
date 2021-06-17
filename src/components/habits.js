import { useEffect, useState } from 'react';
import './habits.css';
import { AiOutlineClose,AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';


const Habits =()=>{
    // get data from local storage
    const Habits = JSON.parse(localStorage.getItem('Habits')) || [];
    const [habits, setHabits]=useState(Habits);
   
    const[input, setInput]=useState(' ')
    const[prgrs, setPrgrs]=useState(0);
    const Checked = JSON.parse(localStorage.getItem('Checked')) || 0;
    const [checked, setChecked] = useState(Checked);

    const handleChange=(e)=>{
        setInput(e.target.value);
    }
    //handle submit
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!input || !/\S/.test(input)){
            alert('Please enter your habit')
        }
        const habit={
            Id: Math.random(),
            text: input,
            check:false
        }
        const newhabits = [habit, ...habits];
        setHabits(newhabits); 
        // reset input field
        setInput(' ');

    }
    
    //store data in local storaage
    useEffect(()=>{
        localStorage.setItem('Habits',JSON.stringify(habits));
        var count = 0;
        habits.map((hab)=>{
            if(hab.check){
                count+=1;
            }  
            return(
                count
            )
        })
        setChecked(count)
        localStorage.setItem('Checked', JSON.stringify(checked));
        var percentage = (checked/habits.length * 100).toPrecision(3);
        setPrgrs(percentage);
    },[habits, checked])
    //delete hobby
    const handleDelete=(Id)=>{
        const newHabits= [...habits].filter(habit=>habit.Id !== Id)
        setHabits(newHabits);
    }

    // handle check
    const handleCheck =(Id)=>{
         for(var i=0;i<habits.length; i++){
            if (habits[i].Id===Id){
                const heck = habits[i].check;
                habits[i].check = !heck;
                const newhabits = [...habits];
                setHabits(newhabits);
            }
        }
        
    }
    //handle edit
    const handleEdit=(Id)=>{
        for(var i=0;i<habits.length; i++){
            if (habits[i].Id===Id){
               
                setInput(habits[i].text);
                handleDelete(Id)
            }
        } 
    }
    // Reset hobbies state
    const handleReset =()=>{
        var newhabits = habits.map((hab) =>{ 
            hab.check=false
            return(hab)
        })
            setHabits(newhabits);
    }


    return(
      <div id= "habit-table">
          <h2>Track your habits</h2>
           <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} name="habit" placeholder='Add a habit...' required></input>
                <button type="submit">Add habit</button>
            </form>
            <form>            
             <progress id="file" max="100" value={prgrs}> </progress>
             <button type="reset" onClick={handleReset} className="resetBtn">Reset</button>        
             </form>

             <ul>
                 {habits.map((hab)=>{
                    if(hab.check){return(
                        <li key={hab.Id} className="checkedHabit" >
                             {hab.text} <AiOutlineClose onClick={()=>handleDelete(hab.Id)} className="glyphicon glyphicon-remove" /> <AiOutlineEdit onClick={()=>handleEdit(hab.Id)} className="AiOutlineEdit"/> <AiOutlineCheck onClick={()=>handleCheck(hab.Id)} className="AiOutlineCheck" />
                         </li>)}else{return(
                         <li key={hab.Id} onDoubleClick={()=>handleCheck(hab.Id)} >
                             {hab.text}  <AiOutlineClose onClick={()=>handleDelete(hab.Id)} className="glyphicon glyphicon-remove" /> <AiOutlineEdit onClick={()=>handleEdit(hab.Id)}  className="AiOutlineEdit"/> <AiOutlineCheck onClick={()=>handleCheck(hab.Id)} className="AiOutlineCheck"/>
                        </li>
                     )}
                 })}   
             </ul>
        </div>
    );
}

export default Habits;
