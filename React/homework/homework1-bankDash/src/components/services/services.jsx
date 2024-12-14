import React from 'react'
import style from './services.module.css'
import { CiSettings } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";


const Services = () => {
  return (
    <div className={style.services}>
        <h1 className={style.text}>Transactions</h1>
        <form action="" className={style.form}>
            <input type="text" className={style.input} placeholder='Search for something'/>
            <button className={style.button}><CiSettings /></button>
            <button className={style.button}><IoIosNotifications /></button>
            
        </form>
        <img className={style.img} src="https://s3-alpha-sig.figma.com/img/57d3/d250/790e98129931897251abd3915a931233?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JA0Rp3d~BW0Geefj5qL1rxazTlCGuO6UR4M2TtCFVj2EjgvhVNU1c1TJBV7QEBExUJisLbfzRE3RVYG5x-QptTWY4P8yU0hDroVLXeBjeu8kKSdA98M5Vl2zsj5fRd5aE7dVE8DbUJzjloml3b8NgsH-8b9ow8f3k4coy8vAvZ1uk6PkxRlOfHV67G7LqM6lmUqefu8~zr7oEkjF3tejn6Qn6ZL-vJ7foHDp6FjoDAEjDB01stBecKWK6~8CH8NkXisgWl2qZHCrxzWLJClBfeMvNJIXZCwNvM8f0YQ7cpAFDRC0Szyv0N5NspuIXggS-o5I3OGmAcaj5Q-M2T3CCw__" alt="" />
    </div>
  )
}

export default Services