'use client'

import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from '../_actions';
import toast from 'react-hot-toast';
import useSupabaseClient from '@/lib/supabase/client';
import '@fontsource/playfair-display'; // Remember to install this font in your project.
import '@fontsource/inter'; // Remember to install this font in your project.

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(values);
      const { error } = JSON.parse(result);

      if (error?.message) {
        setError(error.message);
        toast.error(error.message);
        console.log('Error message', error.message);
        reset({ password: '' });
        return;
      }

      setError('');
      toast.success('Successfully logged in');
      router.push('/');
    });
  };

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };
  const inputStyle =
    'form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-SubtleGreen focus:outline-none font-inter';

  const buttonStyle =
    'inline-block px-7 py-4 bg-SubtleGreen text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:bg-opacity-90 focus:bg-opacity-90 active:bg-opacity-80 transition duration-150 ease-in-out w-full font-inter';

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='bg-white rounded-lg p-10 hover:shadow-xl transition-shadow duration-300'>
      <h2 className='text-3xl text-gray-900 mb-4 font-playfair-display'>Fenrisk Login</h2>
      {error && (
        <p className='text-center text-red-600 py-4 mb-6 rounded'>{error}</p>
      )}
      {/* Input for email */}
      <div className='mb-6'>
        <input
          type='email'
          {...register('email')}
          placeholder='Email address'
          className={`${inputStyle}`}
        />
        {errors.email && (
          <span className='text-red-500 text-xs pt-1 block'>
            {errors.email?.message as string}
          </span>
        )}
      </div>
      {/* Input for password */}
      <div className='mb-6'>
        <input
          type='password'
          {...register('password')}
          placeholder='Password'
          className={`${inputStyle}`}
        />
        {errors.password && (
          <span className='text-red-500 text-xs pt-1 block'>
            {errors.password?.message as string}
          </span>
        )}
      </div>
      {/* Submit button */}
      <button
        type='submit'
        disabled={isPending}
        className={`${buttonStyle} ${isPending ? 'bg-gray-400' : 'bg-SubtleGreen'}`}
      >
        {isPending ? 'Loading...' : 'Sign In'}
      </button>
      {/* ... */}
      {/* Social buttons */}
      <div className='my-6'>
        {/* ... existing Google and GitHub buttons with updated classes */}
      </div>
    </form>
  );
};