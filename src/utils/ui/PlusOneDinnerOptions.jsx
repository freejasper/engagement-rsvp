export default function PlusOneDinnerOptions({ dinnerDisabled, plusOne, dinnerPlusOneAttendance, handleChangePlusDinner }) {  
    return (
        <>
            <fieldset
                id='plus-one-dinner-options' 
                disabled={dinnerDisabled} 
                className='radio-input' >
                <legend>{plusOne}</legend>
                <div 
                    className='radio-option' >
                    <input 
                        type='radio'
                        name='plus-dinner-attendance' 
                        value='attending' 
                        id='plus-attending' 
                        checked={dinnerPlusOneAttendance === 'attending'} 
                        onChange={handleChangePlusDinner} />
                    <label>Is interested</label>
                </div>
                <div 
                    className='radio-option'>
                    <input 
                        type='radio' 
                        name='plus-dinner-attendance' 
                        value='not-attending' 
                        id='plus-not-attending' 
                        checked={dinnerPlusOneAttendance === 'not-attending'} 
                        onChange={handleChangePlusDinner} />
                    <label>Is not interested</label>
                </div>
            </fieldset>
        </>
    );
}