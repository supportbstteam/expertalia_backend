
const SbButton = (props)=>{   
   
    const type = props.data.type ?? 'button'
    const text = props.data.text ?? 'Submit'
    const btnClass = props.data.class ?? ''
    const disabled = props.data.disabled ?? false   
    return(         
		<>
        {
            <>
            <button className={btnClass} type={type} disabled={disabled}>
            {text}
            {
                disabled === true &&
                <>
                &nbsp;&nbsp;&nbsp;
                <div className="spinner-border spinner-border-sm text-light" style={{verticalAlign:"middle"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> 
                </>
            }            
            </button>            
            </>
        }           
        </>
    )
}
export default SbButton;