export default function RsvpOptions({ disabled, attendance, handleChange }) {  
    return (
        <>
            <fieldset
                id='rsvp-options' 
                disabled={disabled} 
                className='radio-input' >
                <legend>I am</legend>
                <div 
                    className='radio-option' >
                    <input 
                        type='radio'
                        name='attendance' 
                        value='attending' 
                        id='attending' 
                        checked={attendance === 'attending'} 
                        onChange={handleChange} />
                    <label>attending</label>
                </div>
                <div 
                    className='radio-option'>
                    <input 
                        type='radio' 
                        name='attendance' 
                        value='not-attending' 
                        id='not-attending' 
                        checked={attendance === 'not-attending'} 
                        onChange={handleChange} />
                    <label>not attending</label>
                </div>
            </fieldset>
        </>
    );
}