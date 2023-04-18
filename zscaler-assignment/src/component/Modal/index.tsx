
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal
} from "reactstrap"
  
function CustomModal(props: Props) {
    const {modal, toggle} = props;
  
    return (
        <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <Modal isOpen={modal} toggle={toggle}>
                {props.children}
            </Modal>
        </div >
    );
}

type Props = {
    modal: boolean;
    toggle: () => void;
    children: React.ReactNode
}
  
export default CustomModal;