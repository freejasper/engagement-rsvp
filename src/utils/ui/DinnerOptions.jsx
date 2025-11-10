export default function DinnerOptions({ dinnerDisabled, dinnerAttendance, handleChangeDinner }) {  
    return (
        <>
            <fieldset
                id='dinner-options' 
                disabled={dinnerDisabled} 
                className='radio-input' >
                <legend>I am</legend>
                <div 
                    className='radio-option' >
                    <input 
                        type='radio'
                        name='dinner-attendance' 
                        value='attending' 
                        id='attending' 
                        checked={dinnerAttendance === 'attending'} 
                        onChange={handleChangeDinner} />
                    <label>Interested</label>
                </div>
                <div 
                    className='radio-option'>
                    <input 
                        type='radio' 
                        name='dinner-attendance' 
                        value='not-attending' 
                        id='not-attending' 
                        checked={dinnerAttendance === 'not-attending'} 
                        onChange={handleChangeDinner} />
                    <label>Not interested</label>
                </div>
            </fieldset>
        </>
    );
}