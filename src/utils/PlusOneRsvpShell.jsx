import { useEffect, useState, useRef } from 'react';
import PlusOneRsvp from './ui/PlusOneRsvp';
import '../css/rsvpOpt.css';

export default function PlusOneRsvpShell({ attendance, skipPlusOne, plusOne, plusOneAttendance, setPlusOneAttendance }) {
    function handleChange({ target }) {
        setPlusOneAttendance(target.value);
    }

    const [disabled, setDisabled] = useState(true);
    const plusOneRsvpRef = useRef(null);

    useEffect(() => {
        if (attendance === 'attending' && !skipPlusOne) {
            setDisabled(false);
            if (plusOneRsvpRef.current) {
                plusOneRsvpRef.current.classList.remove('rsvp-options-hidden');
                plusOneRsvpRef.current.classList.add('rsvp-options-visible');
            }
        } else {
            setDisabled(true);
            if (plusOneRsvpRef.current) {
                plusOneRsvpRef.current.classList.remove('rsvp-options-visible');
                plusOneRsvpRef.current.classList.add('rsvp-options-hidden');
            }
            const timer = setTimeout(() => {
                setPlusOneAttendance('');
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [attendance, plusOne, setPlusOneAttendance, skipPlusOne]);

    useEffect(() => {
        if (!skipPlusOne && plusOneAttendance === 'attending') {
            setDisabled(true);
            if (plusOneRsvpRef.current) {
                plusOneRsvpRef.current.classList.remove('rsvp-options-visible');
                plusOneRsvpRef.current.classList.add('rsvp-options-hidden');
            }
        }
    }, [plusOneAttendance, skipPlusOne]);

    return (
        <>
            <PlusOneRsvp 
                disabled={disabled} 
                plusOneRsvpRef={plusOneRsvpRef} 
                plusOne={plusOne} 
                plusOneAttendance={plusOneAttendance} 
                handleChange={handleChange} /> 
        </>
    )
}