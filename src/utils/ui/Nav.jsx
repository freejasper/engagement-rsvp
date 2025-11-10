import { useEffect, useState } from 'react';
import '../../css/Nav.css';

export default function Nav({ step, setStep, dinnerInvite, attendanceComplete, noAttendance }) {

    const [showNav, setShowNav] = useState(false);

    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(false);

    useEffect(() => {
        if (step === 1) {
            setShowNav(false);
        }
        if (step === 2) {
            if (dinnerInvite && attendanceComplete) {
                setShowNav(true);
            } else if (noAttendance) {
                setShowNav(false);
            } else {
                setShowNav(false);
            }
        }
        if (step === 3) {
            setShowNav(true);
        }
    }, [dinnerInvite, step, attendanceComplete, noAttendance]);

    useEffect(() => {
        if (step === 1) {
            setShowNext(false);
            setShowPrev(false);
        }
        if (step === 2) {
            if (dinnerInvite) {
                setShowNext(true);
            } else {
                setShowNext(false);
            }
            setShowPrev(false);
        }
        if (step === 3) {
            setShowNext(false);
            setShowPrev(true);
        }
    }, [dinnerInvite, step, attendanceComplete]);
    
    function handlePrev() {
        if (step > 1) {
            setStep((prev) => prev - 1);
        }
    }

    function handleNext() {
        if (dinnerInvite) setStep((prev) => prev + 1);
    }

    return (
        <>
            {showNav && <div id='next-prev-container'>
                <button id='prev' disabled={!showPrev} onClick={handlePrev} >{'<--PREV'}</button>
                <button id='next' disabled={!showNext} onClick={handleNext} >{'NEXT-->'}</button>
            </div>}
        </>
    );
}