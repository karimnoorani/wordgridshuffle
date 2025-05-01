export default function Letter(props){
  return (<button 
            onClick={() => props.addLetterToWord(props.index)}
            className={props.selected ? "selectedKey" : "unselectedKey"}
            aria-disabled={props.selected}
            aria-label={`Letter ${props.value}`}
          >
            {props.value}
          </button>)
}