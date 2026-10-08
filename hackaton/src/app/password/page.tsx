"use client"; 
import { useState, useRef, useEffect, ChangeEvent } from "react"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 

export default function PasswordGenerator() {

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    const [length, setLength] = useState<number>(12);
    const [isUppercaseActive, setIsUppercaseActive] = useState<boolean>(false);
    const [isLowercaseActive, setIsLowercaseActive] = useState<boolean>(false);
    const [useNumbersActive, setIsNumbersActive] = useState<boolean>(false);
    const [useSymbolsActive, setIsSymbolsActive] = useState<boolean>(false);

    function generatePassword() {        
        let charset = "";
        if (isUppercaseActive) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (isLowercaseActive) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useNumbersActive) charset += "0123456789";
        if (useSymbolsActive) charset += "!@#$%^&*";

        let password = "";
        for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(password);
    }

  function copyPassword() {
    if (password) {
      navigator.clipboard.writeText(password);
      
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setLength(Number(event.target.value));
    }   

   return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
      <h2 className='text-4xl font-bold text-gray-800 dark:text-white'>Password Generator</h2>
      <div className='password-field'>
        <span className='bg-gray-300 text-gray-800 placeholder:text-gray-500e p-2' id='password'>{password}</span>
        
        <button className='btn border-2 border-cyan-200 bg-cyan-200 text-gray-800 hover:bg-green-300' id='clipboard' title='Copy' onClick={copyPassword}>
          Copy password
        </button>
      </div>
      <div className='options'>
        <div className='option'>
          <label>Length</label>
          <input type='range' id='length' min='4' max='20' value={length} onChange={handleChange} />
          {length}
        </div>
        <div className='option'>
          <label>A-Z</label>
          <input type='checkbox' id='uppercase' checked={isUppercaseActive} onChange={(e) => setIsUppercaseActive(e.target.checked)} />
        </div>
        <div className='option'>
          <label>a-z</label>
          <input type='checkbox' id='lowercase' checked={isLowercaseActive} onChange={(e) => setIsLowercaseActive(e.target.checked)} />
        </div>
        <div className='option'>
          <label>0-9</label>
          <input type='checkbox' id='numbers' checked={useNumbersActive} onChange={(e) => setIsNumbersActive(e.target.checked)} />
        </div>
        <div className='option'>
          <label>!@#$%^&*</label>
          <input type='checkbox' id='symbols' checked={useSymbolsActive} onChange={(e) => setIsSymbolsActive(e.target.checked)} />
        </div>
      </div>
      <button className='btn border-2 border-cyan-200 bg-cyan-200 text-gray-800' id='generate' onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}
