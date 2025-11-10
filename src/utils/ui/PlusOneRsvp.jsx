export default function PlusOneRsvp({ disabled, plusOne, plusOneAttendance, handleChange }) {
    return (
        <fieldset 
                id='plus-one-rsvp-options'
                disabled={disabled} 
                className='radio-input' >
                <legend>{plusOne}</legend>
                <div 
                    className='radio-option' >
                    <input 
                        type='radio'
                        name='plus-attendance' 
                        value='attending' 
                        id='attending' 
                        checked={plusOneAttendance === 'attending'} 
                        onChange={handleChange} />
                    <label>is attending</label>
                </div>
                <div 
                    className='radio-option'>
                    <input 
                        type='radio' 
                        name='plus-attendance' 
                        value='not-attending' 
                        id='not-attending' 
                        checked={plusOneAttendance === 'not-attending'} 
                        onChange={handleChange} />
                    <label>is not attending</label>
                </div>
            </fieldset>
    )
}