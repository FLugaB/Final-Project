

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const timerAlert = (val) => {
   return (
        MySwal.fire({
            position: "top-end",
            text: `${val}`,
            width: 300,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
   )
}

const errorAlert = (val) => {
    MySwal.fire({
        title: `Oops...`,
        icon: `error`,
        text: `${val.message}`,
        width: 600,
        padding: '3em',
        background: '#fff url(https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif)',
      })
}

const successAlert = (val) => {
    MySwal.fire({
        title: `Well done...`,
        icon: `success`,
        text: `${val}`,
        width: 600,
        padding: '3em',
        background: '#fff url(https://cdn.dribbble.com/users/1238709/screenshots/4069900/success_celebration_800x600.gif)',
      })
}

const infoAlert = (val) => {
    MySwal.fire({
        title: 'Are you sure?',
        text: "Products & alternate images associated with this category will removed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {

            

            MySwal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
      })
}

export {
    timerAlert,
    errorAlert,
    successAlert,
    infoAlert
}

