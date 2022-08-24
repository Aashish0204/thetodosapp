import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'
import { ListItem, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import {db} from './firebase_config'
import {logOut,uid} from '../components/firebase_config'

export default function Todos() {

  const [todosInput, setTodosInput] = useState('');
  const [todosList, setTodosList] = useState([]);
  var tempuid=uid.toString();
  function AddTodo(e) {
        if (todosInput === "") {
            alert('Feild cannot be empty')
          }
          else {
            e.preventDefault();
          db.collection('todos').add({
          todos: todosInput,
          status: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid:tempuid
          })
          setTodosInput('')
    }
  }

  useEffect(() => {
        getTodo()
      }, [])

      function getTodo() {
        db.collection('todos').where("uid", "==", tempuid).onSnapshot(function (querySnap) {
          setTodosList(
            querySnap.docs.map((doc) => ({
              id: doc.id,
              todos: doc.data().todos,
              status: doc.data().status
            })))
        })
      }

      function deleteTodo(id) {
        db.collection('todos').doc(id).delete();
  }
      function toggleForStatus(id, status) {
        db.collection('todos').doc(id).update({ status: !status, })
      }
      async function logOutUser() {
        try {
            await logOut()
            console.log("deleted")
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
      return (
      <>
        <div className="btn">
        </div>
        <div className="container" style={{ 'backgroundColor': 'aliceblue', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center', 'minHeight': '100vh' }}>
          <form>
          <Button variant="text"  type='submit' onClick={logOutUser}>LogOut</Button>
          </form>
          <div className="heading">
            <h1><u>Todos App</u></h1>
          </div>
          <div className="input">
            <form>
              <TextField id="standard-basic" label="Task" variant="standard" style={{ 'width': '40vw' }} value={todosInput} onChange={(e) => { setTodosInput(e.target.value); console.log(e.target.value) }} />
              <Button variant="text" type='submit' onClick={AddTodo} >Save</Button>
            </form>
          </div>
          {todosList.map((todoitems) => (
            <div key={todoitems.id} style={{ 'margin': '5px', 'backgroundColor': '#80ffff', 'display': 'flex', 'justifyContent': 'flex-start', 'alignItems': 'center', 'minWidth': '30vw', 'padding': '5px' }}>
              <div className="contents">
                <List>
                  <ListItem>
                    <ListItemText primary={todoitems.todos} secondary={todoitems.status ? 'Completed' : 'Still Pending'}></ListItemText>
                  </ListItem>
                </List>
              </div>
              <div className="btns" style={{ 'marginLeft': 'auto' }}>
                <Button variant="text" onClick={() => {
                  deleteTodo(todoitems.id)
                }} >Delete</Button>
                <Button variant="text" onClick={() => {
                  toggleForStatus(todoitems.id, todoitems.status)
                }} >{todoitems.status ? "Mark Undone" : 'Mark Done'}</Button>
              </div>
            </div>
          ))}
        </div>
      </>
  )
}
