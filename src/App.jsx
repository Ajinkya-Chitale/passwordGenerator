import './App.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Checkboxes from './components/Checkboxes';
import Button from './components/Button';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [passLength, setPassLength] = useState("8");
  const [lowerCaseAllowed, setLowerCaseAllowed] = useState(true);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(true);
  const [numbersAllowed, setNumbersAllowed] = useState(true);
  const [specialAllowed, setSpecialAllowed] = useState(true);
  const [myPass, setMyPass] = useState('');
  const [theme, setTheme] = useState('light-theme');
  const [themeText, setThemeText] = useState('Dark');

  // Use Effect to call the generate password function when first time page get load as well as when the event occurs such as checkbox or length change
  useEffect(() => {
    passGenerator();
    checkboxSelected();
  }, [passLength, lowerCaseAllowed, upperCaseAllowed, numbersAllowed, specialAllowed])

  // useEffect to change theme color
  useEffect(() => {
    document.body.className = theme;
  },[theme])

  // Ref hook to foucs the input text when it gets copied
  const inputRef = useRef();

  // Generate Password Function
  const passGenerator = () => {
    let str = "";
    let generatedPass = "";

    if(upperCaseAllowed) {
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(lowerCaseAllowed) {
      str += "abcdefghijklmnopqrstuvwxyz";
    }

    if(numbersAllowed) {
      str += "0123456789";
    }

    if(specialAllowed) {
      str += "!@#$%^&*()_+.?/";
    }

    for (let i = 0; i < passLength; i++) {
      let char = Math.floor(Math.random() * str.length);
      generatedPass += str.charAt(char);
    }
    setMyPass(generatedPass);
  }

  // Function to make sure atleast one checkbox should be selected
  const checkboxSelected = () => {
    let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkboxArr = [];

    allCheckboxes.forEach(ele => {
      if(ele.checked){
        checkboxArr.push(ele.id);
      }
    });

    if(checkboxArr.length === 1) {
      document.querySelector(`#${checkboxArr[0]}`).setAttribute("disabled", 'true');
    }
    else if(checkboxArr.length > 1) {
      allCheckboxes.forEach(ele => {
        if(ele.hasAttribute("disabled")) {
          document.querySelector(`#${ele.id}`).removeAttribute("disabled");
        }
      });
    }
  }

  // Funtion to copy the generated password
  const copyText = (e) => {
    inputRef.current.select();
    navigator.clipboard.writeText(myPass);
  }

  // Function to Change Theme
  const themeChange = () => {
    let toggle = document.querySelector('#toggle');

    if(theme === "dark-theme") {
      setTheme('light-theme');
      setThemeText('Dark');
      toggle.classList.remove('ml-auto');
      toggle.classList.add('mr-auto');
    }
    else {
      setTheme('dark-theme');
      setThemeText('Light');
      toggle.classList.remove('mr-auto');
      toggle.classList.add('ml-auto');
    }
  }

  return (
    <>
      <div className='main m-auto rounded-md shadow-2xl px-20 py-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
        <div>
          <div className='flex justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <ArrowForwardIosIcon className='arrowColor' fontSize="small" /> <h1 className='text-xl font-medium '>Generate a secure password</h1>
            </div>
            <div className='flex items-center gap-2'>
              <button 
                title="Toggle Theme" 
                onClick={themeChange}
                id='toggleBtn'
                className="
                    w-12 
                    h-6 
                    rounded-full 
                    p-1 
                    relative 
                    transition-colors 
                    duration-300 
                    ease-in
                    focus:outline-none
                    focus:border-transparent
                  ">
                  <div id="toggle"
                    className="
                        rounded-full 
                        w-4 
                        h-4 
                        relative  
                        dark:ml-6 
                        pointer-events-none 
                        transition-all 
                        duration-400 
                        ease-linear
                    ">
                  </div>
              </button>
              <label className='toggleBtnLabel cursor-pointer' htmlFor="toggleBtn">{themeText}</label>
            </div>
          </div>
          <div className='relative'>
            <input id='passwordBox' type="text" className='w-full px-2 py-1 border border-lime-800 rounded-sm outline-none hover:border-lime-800' readOnly value={myPass} ref={inputRef} />
            <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={copyText}>
              <ContentCopyIcon />
            </button>
          </div>
        </div>
        <div className='border border-dashed border-gray-300 my-8'></div>
        <h2 className='text-lg font-medium mb-6'>Customize your password</h2>
        <div className='flex justify-between border border-lime-800 px-8 py-5'>
          <div>
            <Checkboxes text="lowercase" marginBottom="mb-3" isChecked={lowerCaseAllowed} checkFlag={() => {setLowerCaseAllowed((prev) => !prev)}} />
            <Checkboxes text="uppercase" marginBottom="mb-3" isChecked={upperCaseAllowed} checkFlag={() => {setUpperCaseAllowed((prev) => !prev)}} />
            <Checkboxes text="numeric" marginBottom="mb-3" isChecked={numbersAllowed} checkFlag={() => {setNumbersAllowed((prev) => !prev)}} />
            <Checkboxes text="symbols" marginBottom="" isChecked={specialAllowed} checkFlag={() => {setSpecialAllowed((prev) => !prev)}} />
          </div>
          <div className='w-40'>
            <p>Password Length: {passLength}</p>
            <input type="range" min="8" max="30" value={passLength} onChange={(e) => {setPassLength(e.currentTarget.value)}} />
          </div>
        </div>
        <div>
          <Button marginTop="mt-5" generateFun={passGenerator} />
        </div>
      </div>
    </>
  )
}

export default App
