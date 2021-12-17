import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [userList, setUserList] = useState(null)
  const [showList, setShowList] = useState(null)
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [openUpdate, setOpenUpdate] = useState(false)
  const [checkEmail, setCheckEmail] = useState("")
  const [checkName, setCheckName] = useState("")
  const [checkUserName, setCheckUserName] = useState("")
  const [findUserEmail, setFindUserEmail] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setUserList(data)
      })
      .catch((err) => { console.log(err) })
  }, [])

  useEffect(() => {
    if (userList) {
      let temp = []
      for (let i = 0; i <= userList.length - 1; i++) {
        temp.push({ name: userList[i].name, username: userList[i].username, email: userList[i].email })
      }
      setShowList(temp)
    }
  }, [userList])


  const showListAction = (user) => {
    return (
      <div key={user.email} className="eachItem">
        <p>Name</p>
        <p>{user.name}</p>
        <p>User name</p>
        <p>{user.username}</p>
        <p>email</p>
        <p>{user.email}</p>
        <div className="deleteButton" onClick={() => deleteAction(user.email)}>Delete</div>

        <div className="updateButton" onClick={() => {
          setCheckName(user.name)
          setCheckUserName(user.username)
          setCheckEmail(user.email)
          setFindUserEmail(user.email)
          setOpenUpdate(true)
        }}>Update</div>
      </div>
    )
  }

  const addButtonAction = () => {
    if (name !== "" && email !== "" && userName !== "") {
      console.log("hi")
      showList.push({ name: name, username: userName, email: email })
      setShowList(showList)

      document.getElementById("name").value = ""
      document.getElementById("username").value = ""
      document.getElementById("email").value = ""
      setName("")
      setUserName("")
      setEmail("")
      console.log(showList)
    }
  }

  const deleteAction = (email) => {
    let temp = showList.filter(user => user.email !== email)
    setShowList(temp)
  }

  const updateAction = () => {
    let index = 0
    if (showList !== null && showList.length - 1 > 0) {
      index = showList.findIndex(user => user.email === findUserEmail)
    }

    showList[index].name = checkName
    showList[index].email = checkEmail
    showList[index].username = checkUserName
    setShowList(showList)

    setCheckName("")
    setCheckEmail("")
    setCheckUserName("")
    setOpenUpdate(false)
  }

  const showUpdateScreen = () => {
    return (
      <div>

        <div className="updateBack">
          <div className="updateScreen">
            <div className="inputGroup">
              <p>Name</p>
              <input type="name" onChange={(e) => { setCheckName(e.target.value) }} placeholder={checkName && checkName} />

              <p>User name</p>
              <input type="name" onChange={(e) => { setCheckUserName(e.target.value) }} placeholder={checkUserName && checkUserName} />

              <p>Email</p>
              <input type="email" onChange={(e) => { setCheckEmail(e.target.value) }} placeholder={checkEmail && checkEmail} />

              <div className="addButton" onClick={() => updateAction()}>Update</div>

              <div className="cancelButton" onClick={() => setOpenUpdate(false)}>Cancel</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {openUpdate && showUpdateScreen()}
      <div className="header">
        <div></div>
        <div>Coding Test</div>
        <div></div>
      </div>

      <div className="inputGroup">
        <p>Name</p>
        <input type="name" onChange={(e) => { setName(e.target.value) }} placeholder={name} id="name" />

        <p>User name</p>
        <input type="name" onChange={(e) => { setUserName(e.target.value) }} id="username" />

        <p>Email</p>
        <input type="email" onChange={(e) => { setEmail(e.target.value) }} id="email" />
        <div className="addButton" onClick={() => addButtonAction()}>Add</div>
      </div>

      <div className="showList">
        {(showList !== null && showList.length >= 0) && showList.map(showListAction)}
      </div>

    </div>
  );
}

export default App;
