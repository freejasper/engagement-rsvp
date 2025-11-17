import { useState, useEffect } from 'react';

export default function SubmitForm ({
    matchedName,
    attendanceComplete,
    dinnerAttendanceComplete,
    submitForm,
    dinnerInvite,
    noAttendance
    }) {
    
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        if ((dinnerInvite && matchedName && attendanceComplete && dinnerAttendanceComplete)) {
            setSubmitDisabled(false);
        } else if (!dinnerInvite && matchedName && attendanceComplete) {
            setSubmitDisabled(false);
        } else if (matchedName && noAttendance) {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [dinnerInvite, matchedName, attendanceComplete, dinnerAttendanceComplete, noAttendance]);
    
    function handleSubmit() {
        setSubmitDisabled(true);
        submitForm();
        setSubmitDisabled(false);
    }

    return (
        <>
            {!submitDisabled && <button id='submit-button' onClick={handleSubmit} >SUBMIT</button>}
        </>
    )
}