import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Todos from '../components/Todos'
import { signUp, logIn } from '../components/firebase_config'

export default function LoginPage() {
    var [Email, setsEmail] = useState('')
    var [Password, setsPassword] = useState('')
    var [state, setState] = useState('login')
    async function signUpUser() {
        try {
            await signUp(Email, Password)
            setsEmail('')
            setsPassword('')
            setState('login')
            // document.getElementById('comment').style.display = 'block';
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    async function logInUser(e) {
        e.preventDefault()
        try {
            await logIn(Email, Password)
            setState('todos')
            return (<Todos  />)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
            {state === 'login' &&
                <>
                    <div className="conatainer" id='login' style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <h1>Login</h1>
                        <TextField onChange={(e) => { setsEmail(e.target.value) }} id="standard-basic1" label="Email" variant="standard" style={{ 'width': '30vw', 'marginTop': '15px' }} value={Email} />
                        <TextField onChange={(e) => { setsPassword(e.target.value) }} id="standard-basic2" label="Password" type={'password'} variant="standard" style={{ 'width': '30vw', 'marginTop': '10px' }} value={Password} />
                        <div className="buttons" style={{ 'marginTop': '10vh', 'padding': '5px', 'display': 'flex', 'justifyContent': 'flex-start', 'width': '30vw' }}>
                            <Button variant="text" type='submit' onClick={logInUser}>Login</Button>
                            <Button variant="text" type='' style={{ 'marginLeft': 'auto' }}
                                onClick={() => {
                                    setState('signup');
                                    setsEmail('')
                                    setsPassword('')
                                }}>Didn't have a Account</Button>
                        </div>
                    </div>
                    <div id="comment" style={{ 'color': 'green', 'display': 'none', 'textAlign': 'center', 'margin': '3vh' }}><b>You are Succesfully Signed Up.</b></div>

                </>}
            {state === 'signup' &&
                <>

                    <div className="conatainer" id='signup' style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <h1>SignUP</h1>
                        <TextField onChange={(e) => { setsEmail(e.target.value) }} id="standard-basic3" label="Email" variant="standard" style={{ 'width': '30vw', 'marginTop': '15px' }} value={Email} />
                        <TextField onChange={(e) => { setsPassword(e.target.value) }} id="standard-basic4" label="Password" type={'password'} variant="standard" style={{ 'width': '30vw', 'marginTop': '10px' }} value={Password} />
                        <div className="buttons" style={{ 'marginTop': '10vh', 'padding': '5px', 'display': 'flex', 'justifyContent': 'flex-start', 'width': '30vw' }}>
                            <Button variant="text" type='' onClick={signUpUser}>SignUP</Button>
                            <Button variant="text" type='' style={{ 'marginLeft': 'auto' }}
                                onClick={() => {
                                    setsEmail('')
                                    setsPassword('')
                                }}>Already have a Account</Button>
                        </div>
                    </div>
                </>}
            {state === 'todos' && <Todos/>}
        </>
    )
}

