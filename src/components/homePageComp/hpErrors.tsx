export default function HpErrors(props: hpErrors){
    return(<>
    {props.errores.map(error=>{
        <p className=""></p>
    })}
    </>)
}
interface hpErrors{
    errores: string[];
}