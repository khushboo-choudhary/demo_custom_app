import { useEffect, useState } from 'react'
// import { Dots } from "./dots"
import './App.css'
import axios from "axios"
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Switch from '@mui/material/Switch';




function App() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [num, setNum] = useState(0)
  const [actionNum, setActionNum] = useState(0)
  // const [conditionNum, setConditionNum] = useState(0)
  const [actionData, setActionData] = useState([])
  const [data, setData] = useState([])
  const [button, setButton] = useState(false)
  const [actionButton, setActionButton] = useState(false)
  const [conditionButton, setConditionButton] = useState(false)
  const [input, setInput] = useState("Abcd")
  const [name, setName] = useState("Default Rule")
  const [toggle, setToggle] = useState(0)
  const [show, setShow] = useState("none")
  const [action, setAction] = useState({
    "action": "START NEW APP"
  })
  const [rule, setRule] = useState({
    "name": name,
  })

  console.log(show,num,actionNum, setName);
  // const [rename,setRename]=useState("rename")
  const [time, setTime] = useState("6:45")
  const [date, setDate] = useState("3-7-2022")
  const [disableOnSave, setDisableOnSave] = useState(false)
  const [condition, setCondition] = useState({
    "condition": ""
  })
  const [storeCondition, setStoreCondition] = useState([])
  const [ruleId, setRuleId] = useState(0)



  // rule part
  const addRule = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/ruleArray", rule).then(() => {
      setRule({
        "name": name,
      })
    }).then(res => {
      getData()
    })
  }


  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get("http://localhost:8080/ruleArray").then((res) => {
      setData(res.data)
      setNum(res.data.length)
      if (res.data.length >= 5) {
        setButton(true)
      }
      else {
        setButton(false)
      }

    
    }).catch((err) => {
      console.log(err)
    })
  }




  const addAction = () => {
  
    axios.post("http://localhost:8080/actionArray", action).then(() => {
      setAction({
        "action": "START NEW APP",
      })
      console.log("action")
    })
      .then(res => {
        getActionData()
      })
  }

  useEffect(() => {
    getActionData()
  }, [])

  const getActionData = () => {
    axios.get("http://localhost:8080/actionArray").then((res) => {
      setActionData(res.data)
      setActionNum(res.data.length)
      // console.log("action")
      if (res.data.length >= 5) {
        setActionButton(true)
      }
      else {
        setActionButton(false)
      }
      // console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }


  // renaming the rules name

  const handleNameChange = (e) => {
    setInput(e.target.value)
  }

  const handleRenameById = (rename) => {
    setRuleId(rename.target.value)
  }
console.log(handleRenameById)
  const handleSubmit = (e) => {
    const response = axios.patch(`http://localhost:8080/ruleArray/${ruleId}`, { name: input }).then(() => {
      console.log(response.name)
      console.log(ruleId + "ruleId")
     
    }).then(() => {
      getData()
    })
  }



  

  const handleCondition = (e) => {
    setCondition({ ...condition, [e.target.className]: e.target.value })
  }

  const handleConditionSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/conditionArray", condition).then(() => {
      setCondition({
        "condition": ""
      })
      console.log(condition)
    }).then(() => {
      getCondition()
    })
  }

  const getCondition = () => {
    axios.get("http://localhost:8080/conditionArray").then((res) => {
      setStoreCondition(res.data)
      setNum(res.data.length)
      if (res.data.length >= 8) {
        setConditionButton(true)
      }
      else {
        setConditionButton(false)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getCondition()
  }, [])


 

  let today = new Date();
  let newDate = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const NotEditable = () => {
    setToggle(0)
    setShow("none")
    setDate(newDate)
    setTime(newTime)
    setDisableOnSave(true)
    handleSubmit()
  }

  const Editable = () => {
    setToggle(1)
    setShow("block")
    setDisableOnSave(false)
  }



  return (
    <div className="App">
      <div id="header">
        <div id="header_items">
          <img src="customLogo.png" width="20%" height="60%" alt=''/>
          <div>
            <p>Demo Custom App</p>
            <p>APP NAME</p>
          </div>
          <img src="rightArrow.png" alt=''/>
          <div>
            <p>Assessment</p>
            <p>STAGE</p>
          </div>
          <img src="rightArrow.png" alt=''/>
          <div>
            <p>Create PO</p>
            <p>BUTTON</p>
          </div>
          <img src="rightArrow.png" alt=''/>
          <p>Button Rules</p>
        </div>
        <div id="dataSide">
          <p>App saved on {date} {time}</p>
          {(toggle === 0) ?
            <button onClick={Editable} id="saveEdit">Edit</button> :
            <button onClick={NotEditable} id="saveEdit">Done</button>
          }

        </div>
      </div>

      <div id="dashboard">

        <div id="leftDashboard">
          <p style={{ textAlign: "left", paddingLeft: "4%" }}><img src="leftArrow.png" style={{ width: "5%" }} alt=''/> Back to Stages</p>
          <p style={{ textAlign: "left", paddingLeft: "4%", marginTop: "10%" }}>RULES</p>
         
            <Timeline style={{width:"0%"}}>
              <TimelineItem style={{ width:"0%"}} >
                <TimelineSeparator >
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent >
                 <div id="rules_list">
                 
                 {data.map((e) =>
                      <div key={e.id}>
                        <p className="p" style={{width:"180px"}}>{e.name}</p>
                        <img src="copy.png" width="17px" height="15px" alt=''/>
                        <img src="delete.png" onClick={() => {
                            axios.delete(`http://localhost:8080/ruleArray/${e.id}`).then(res => {
                              getData();
                            })
                          }} width="17px" height="15px" alt=''/>
                      </div>
                    )}
                    
                 </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent><p className="p1" style={{width:"160px",height:"30px"}}>Fall back rule<Switch {...label} defaultChecked  /></p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>
                <button id="newRulebutton" style={{width:"170px",height:"40px", margin: "auto" }} disabled={button} onClick={addRule}>Add New Rule</button>
                </TimelineContent>
              </TimelineItem>
            </Timeline>

           
            <img width="20px" height="25px" src="plain.png" alt=''/>&nbsp;<button style={{ marginTop: "75%" }} >Deleted Rules</button>
        </div>


        <div id="rightDashboard">

          <p>{name}</p>
          <br />
          <p>Button Name</p>
          <div style={{ display: "flex" }}>
            <input id="rename" type="text"
              placeholder='Create PO'
              disabled={disableOnSave}
              onChange={handleNameChange}
            />
        
          </div>
          <br />
          <br />
          <div className='flex'>
          <select>
            <option>If All</option>
          </select> <p className='space'>  of the following conditions are met:</p>
          </div>
          <br />
          <div className='flex'>
          <select>
            <option>Text</option>
          </select>&nbsp;&nbsp;
          <select>
            <option>Contains</option>
          </select>&nbsp;&nbsp;
          
          
          <input className='condition'
            
            onChange={handleCondition}
            value={condition.condition}
            type="search" placeholder='type to search and add'></input>
            </div>
          <div id="conditionSpace">
            {storeCondition.map((con) =>
              <div key={con.id}>
                <p id="conditionName" onClick={() => {
                    axios.delete(`http://localhost:8080/conditionArray/${con.id}`).then(res => {
                      getCondition();
                    })
                  }}>{con.condition} &nbsp;&nbsp;
                ✖</p>
                
              </div>
            )}
          </div>
          
          <button
            disabled={conditionButton}
            onClick={handleConditionSubmit}
           id="conditionButton">Add New Condition</button>
          <hr></hr>

          <p>Perform the following action:</p>
          {actionData.map((index) =>
            <div id="actionPart" style={{ display: "flex" }} key={index.id}>
              <p style={{ display: "flex", width:"180px", height:"20px"}} className='flex new'><img src="play.png" alt=''/>&nbsp;&nbsp;{index.action} &nbsp; &nbsp;<p className='setup'> setup</p></p>
              <img id="deleteIcon"
                onClick={() => {
                  axios.delete(`http://localhost:8080/actionArray/${index.id}`).then(res => {
                    getActionData();
                  })
                }}
                src="circleDelete.png" width="20px" height="25px" alt=''/>
            </div>
          )}
          <hr></hr>
          <button style={{ marginBottom: "2%" }} id="actionbutton" disabled={actionButton} onClick={addAction}>Add Another Action</button>

        </div>

      </div>
    </div>
  )
}

export default App
