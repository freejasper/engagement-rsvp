export default function NameInput({ nameInputRef, enteredName, handleChange, handleSubmit, inputOnOff }) {
    return (
        <>
        <form 
            ref={nameInputRef} 
            id='nameInput' 
            className='nameInput-hidden' 
            onSubmit={handleSubmit}>
            <input 
                type="text"
                value={enteredName}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={inputOnOff}
            />
            <input type="submit" value='Submit' hidden />
        </form>
        </>
    );
}