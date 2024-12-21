import React, { Component } from 'react'
import Swal from 'sweetalert2';

  
  export default class Modal extends Component {
    
    closeModal = () => {
        this.props.setIsModal(false)
        Swal.close();
    }

    openModal = () => {
        Swal.fire({
            title: 'Кастомное окно',
            text: 'Вы можете настроить стили!',
            background: '#333',
            color: '#fff',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            willClose: () => {
                this.closeModal();
            }
          });
    };

    componentDidMount(): void {
        this.openModal();
        setTimeout(this.closeModal, 5000)
    }

  
    render(): React.ReactNode {
      return (
        <div>
        </div>
      );
    }
  } 
