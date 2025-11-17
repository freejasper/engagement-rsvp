import { useEffect, useState, useRef } from 'react';
import NameInput from './ui/NameInput';
import '../css/NameInput.css';

export default function NameInputShell({ matchName, setStep }) {
    const [enteredName, setEnteredName] = useState('');

    function handleChange({ target }) {
        setEnteredName(target.value);
        setStep(1);
    }

    // run match function on input change
    useEffect(() => {
        matchName(enteredName);
    }, [enteredName, matchName]);

    // pass down checking function to handle submit
    function handleSubmit(event) {
        event.preventDefault();
        matchName(enteredName);
    }

    const nameInputRef = useRef(null);
    const [inputOnOff, setInputOnOff] = useState(true);

    useEffect(() => {
            const timer = setTimeout(() => {
                if (nameInputRef.current) {
                    nameInputRef.current.classList.remove('nameInput-hidden');
                    nameInputRef.current.classList.add('nameInput-visible');
                    setInputOnOff(false);
                }
            }, 4100);
    
            return () => clearTimeout(timer);
        }, []);

    return (
        <>
            <NameInput 
                nameInputRef={nameInputRef} 
                enteredName={enteredName} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                inputOnOff={inputOnOff} />
        </>
    );
}