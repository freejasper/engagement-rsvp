import { useEffect, useState, useRef } from 'react';
import RsvpOptions from './ui/RsvpOptions';
import PlusOneRsvp from './ui/PlusOneRsvp';
import DinnerOptions from './ui/DinnerOptions';
import PlusOneDinnerOptions from './ui/PlusOneDinnerOptions';
import Nav from './ui/Nav';
import SubmitForm from './ui/SubmitForm';
import '../css/RsvpOpt.css';

export default function RsvpOptionsShell({ 
    matchedName,
    attendance, 
    setAttendance, 
    plusOne, 
    plusOneAttendance, 
    setPlusOneAttendance, 
    skipPlusOne, 
    dinnerAttendance, 
    setDinnerAttendance, 
    dinnerPlusOneAttendance, 
    setDinnerPlusOneAttendance, 
    step, 
    setStep,
    dinnerInvite,
    attendanceComplete,
    setAttendanceComplete,
    dinnerAttendanceComplete,
    setDinnerAttendanceComplete,
    submitForm }) {

    function handleChangeInd({ target }) {
        setAttendance(target.value);
    }

    function handleChangePlus({ target }) {
        setPlusOneAttendance(target.value);
    }

    function handleChangeDinner({ target }) {
        setDinnerAttendance(target.value);
    }

    function handleChangePlusDinner({ target }) {
        setDinnerPlusOneAttendance(target.value);
    }

    const [disabled, setDisabled] = useState(true);
    const rsvpOptionsRef = useRef(null);
    const dinnerOptRef = useRef(null);

    const [dinnerDisabled, setDinnerDisabled] = useState(true);

    const [noAttendance, setNoAttendance] = useState(false);
    

    useEffect(() => {
        if (step === 2) {
            setDisabled(false);
            setDinnerDisabled(true);
        } else if (step === 3) {
            setDisabled(true);
            setDinnerDisabled(false);
        } else {
            setDisabled(true);
            setDinnerDisabled(true);
            setAttendance('');
            setPlusOneAttendance('');
            setDinnerAttendance('');
            setDinnerPlusOneAttendance('');
        }
    }, [step, setAttendance, setPlusOneAttendance, setDinnerAttendance, setDinnerPlusOneAttendance]);

   useEffect(() => {
    const ok = plusOne 
        ? (attendance.length > 0 && plusOneAttendance.length > 0)
        : attendance.length > 0;
    setAttendanceComplete(ok);
    
    if (attendance === 'not-attending' && (!plusOne || plusOneAttendance === 'not-attending')) {
        setNoAttendance(true);
    } else {
        setNoAttendance(false);
    }
    }, [plusOne, attendance, plusOneAttendance, setAttendanceComplete]);

    useEffect(() => {
        console.log('attendance complete:', attendanceComplete);
        console.log('no attendance:', noAttendance);
    }, [attendanceComplete, noAttendance]);

    useEffect(() => {
        const ok = plusOne 
            ? (dinnerAttendance.length > 0 && dinnerPlusOneAttendance.length > 0)
            : dinnerAttendance.length > 0;
        setDinnerAttendanceComplete(ok);
        }, [dinnerAttendance, dinnerPlusOneAttendance, plusOne, setDinnerAttendanceComplete]);

    return (
        <div id='rsvp-options-shell'>
            {!disabled && <div id='rsvpOpt' ref={rsvpOptionsRef} >
                <RsvpOptions 
                    disabled={disabled} 
                    attendance={attendance} 
                    handleChange={handleChangeInd} />
                {!skipPlusOne && <PlusOneRsvp 
                    disabled={disabled}  
                    plusOne={plusOne} 
                    plusOneAttendance={plusOneAttendance} 
                    handleChange={handleChangePlus} />} 
            </div>}
            {!dinnerDisabled && <div id='dinnerOpt' ref={dinnerOptRef} >
                <h5>Indicate Interest in attending dinner at 'The Vietnamese' afterwards (approx. $35pp)</h5>
                <DinnerOptions
                    dinnerDisabled={dinnerDisabled}
                    dinnerAttendance={dinnerAttendance}
                    handleChangeDinner={handleChangeDinner} />
                {!skipPlusOne && <PlusOneDinnerOptions
                    dinnerDisabled={dinnerDisabled}
                    plusOne={plusOne}
                    dinnerPlusOneAttendance={dinnerPlusOneAttendance}
                    handleChangePlusDinner={handleChangePlusDinner} />}
            </div>}
            <div id='buttons'>
                <Nav 
                    step={step} 
                    setStep={setStep}
                    dinnerInvite={dinnerInvite}
                    attendanceComplete={attendanceComplete}
                    attendance={noAttendance} />
                <SubmitForm
                    matchedName={matchedName}
                    attendanceComplete={attendanceComplete}
                    dinnerAttendanceComplete={dinnerAttendanceComplete}
                    submitForm={submitForm}
                    dinnerInvite={dinnerInvite}
                    noAttendance={noAttendance} />
            </div>
        </div>
    );
}