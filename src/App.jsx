import React from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'


const formSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
  }).min(4, 'min 4 chars').max(8, 'max 8 chars').nonempty(),
  lastName: z.string({
    required_error: 'Last name is required',
  }).min(2, 'min 2 chars').max(8, 'max 8 chars').nonempty(),
  email: z.string().email(),


})



function App() {

  const { formState: { errors }, register, handleSubmit, getValues, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
    resolver: zodResolver(formSchema)

  })
  // errors
  // console.log(errors)

  return (
    <div className='App'>
      <h1 className='font-black text-2xl'>Form</h1>
      <form onSubmit={handleSubmit(values => {
        alert(JSON.stringify(values, null, 2))
      })} className='p-4 shadow-lg flex flex-col space-y-4'>
        <div className='flex flex-col  items-start space-y-1 '>
          <input
            type='text'
            // name='firstName' 
            className='min-w-full'
            placeholder='First name'
            {
            ...register('firstName',)
            }
          />
          {

            errors.firstName && (<p className='text-red-500 inline-flex'>{errors.firstName.message}</p>)
          }

        </div>
        <div className='flex flex-col  items-start space-y-1 '>
          <input
            type='text'
            name='lastName'
            className='min-w-full'
            placeholder='Last name'
            {
            ...register('lastName',)
            }
          />
          {

            errors.lastName && (<p className='text-red-500 inline-flex'>{errors.lastName.message}</p>)
          }
        </div>
        <div className='flex flex-col  items-start space-y-1 '>
          <input
            type='text'
            name='email'
            className='min-w-full'
            placeholder='Email'
            {
            ...register('email',)
            }
          />
          {
            errors.email && (<p className='text-red-500 inline-flex'>{errors.email.message}</p>)
          }
        </div>
        <button className='bg-teal-500 hover:bg-teal-600 active:bg-teal-500 py-2 px-3 text-white uppercase'>
          submit
        </button>
        <button onClick={() => setValue('firstName', 'mafia')} className='bg-red-500 hover:bg-red-600 active:bg-teal-500 py-2 px-3 text-white uppercase'>
          sSet value of first name
        </button>
      </form>
      <div className='my-4 p-4 bg-gray-300'>
        <h3 className='font-bold'>Form values:</h3>
        <pre className=''>{JSON.stringify(getValues(), null, 2)}</pre>
      </div>
    </div>
  )
}

export default App



// {
//   required: { value: true, message: 'First name is required' },
//   minLength: { value: 4, message: 'Must be 4 chars in length' },
// }

// {
//   required: { value: true, message: 'Last name is required' },
//   minLength: { value: 2, message: 'Must be 2 chars in length' },
// }

// {
//   pattern:{
//     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//     message: 'Email should be valid email',
//   }
// }