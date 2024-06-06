import React from 'react'
function hoc(ClassName, props) {

    return(<ClassName data= {props}/>);

}

export default hoc;