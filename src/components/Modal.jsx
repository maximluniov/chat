import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'



const Modal = ({ children, open }) => {

    const dialog = useRef();
    useEffect(() => { open ? dialog.current.showModal() : dialog.current.close(); }, [open])
    return createPortal( 
        <dialog className='bg-inherit p-4 outline-none' ref={dialog} >{children}</dialog>
        ,document.getElementById("modal")    
    )
}

export default Modal