import React from 'react'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { Button } from '@mui/material'

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true)
  return (
    <div className='flex justify-center h-[90vh] items-center'>
      <div className='max-w-md h-[85vh] rounded-md shadow-lg'>
        <img className='w-full rounded-t-md' src='https://res-console.cloudinary.com/dz46ubqnx/thumbnails/v1/image/upload/v1742711979/YmFubmVyX3J3NDRsag==/drilldown' alt=''/>
        <div className='mt-8 px-10'>
        {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin}/>}
        <div className='flex items-center gap-1 justify-center mt-5'>
          <p>{isLogin && "Don't"} have an account?</p>
          <Button size='small' onClick={()=>setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Login"}</Button>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Auth