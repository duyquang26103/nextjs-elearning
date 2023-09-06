import AtomicSpinner from 'atomic-spinner'

const styled = {position: "absolute", top: "50%", left: "50%"}
export default function Loading() {
    // @ts-ignore
    return (<div style={styled}>
            <AtomicSpinner nucleusDistanceFromCenter={2.5}/>
        </div>)
}