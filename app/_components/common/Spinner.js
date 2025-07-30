
const Spinner = (props)=>{
    const show = props.show ?? false
    return(         
		<>
        {
            show === true &&
            <>
            &nbsp;&nbsp;&nbsp;
            <div className="spinner-border spinner-border-sm text-light" style={{verticalAlign:"middle"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>     
            </>
        }           
        </>
    )
}
export default Spinner;