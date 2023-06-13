'use client';

import clsx from "clsx";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, required, errors, type,register,disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-400" htmlFor={id}>{label}</label>
      <div className="mt-2">
        <input id={id} type={type} autoComplete={id} disabled={disabled} {... register(id, {required})} className={clsx('form-input block w-full rounded-md border-0 py-1.5 shawdow-sm text-gray-400 ring-1 ring-insert ring-gray-200 placeholder:text-gray-300 focus:ring-2 focus:ring-insert focus:ring-sky-200 sm:text-sm sm:leading-6', errors[id] && 'focus:ring-red-500', disabled && 'opacity-50 cursor-default')} />
      </div>
    </div>
  )
}

export default Input;