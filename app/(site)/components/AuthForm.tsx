'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle, BsFacebook  } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/Input"
import Button from '@/app/components/Button';
import AuthButtons from './AuthButtons';
import { signIn, useSession } from "next-auth/react";


type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if(session?.status === 'authenticated') {router.push('/users')};
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {setVariant('REGISTER')} else {setVariant('LOGIN')};
    }, [variant]);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {name: '', email: '', password: '',}
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(variant === 'REGISTER') {
            axios.post('/api/register', data).then(() => signIn('credentials', data)).catch(() => toast.error('Something went wrong!!!')).finally(() => setIsLoading(false));
        }
        if(variant === 'LOGIN') {
            signIn('credentials',{...data, redirect: false}).then((callback) => {if(callback?.error){toast.error('Invalid Email or Password')}if(callback?.ok && !callback?.error){toast.success('Success!!!'); router.push('/users');}})
            .finally(() => setIsLoading(false));
        }
    }


    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {redirect: false})
        .then((callback) => {if(!callback?.error){toast.error('Invalid Email or Password');};if(callback?.ok && !callback?.error){toast.success('Success!!!')}})
        .finally(() => setIsLoading(false));
    }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (<Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />)}
          <Input id="email" label="Email address" type="email" register={register} errors={errors} disabled={isLoading} />
          <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading} />
          <div>
            <Button disabled={isLoading} fullWidth type='submit'>{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500'>OR CONTINUE WITH</span>
            </div>
          </div>


          <div className='mt-6 gap-2 flex'>
            <AuthButtons icon={BsGoogle} onClick={() => socialAction('google')} />
            <AuthButtons icon={BsFacebook} onClick={() => socialAction('facebook')} />
            <AuthButtons icon={BsGithub} onClick={() => socialAction('github')} />
          </div>



        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN' ? 'New to Fan Messenger Community?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create a new account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm;
