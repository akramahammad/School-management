import React from 'react'
import classes from './Header.module.scss'
import {Layout} from 'antd'
import { Link } from 'react-router-dom'
const { Header} = Layout; 

const HeaderComp=({location})=>{
    
    return(
        <Header>
            <a href="/" className={classes.Logo}>STrack</a>
                <Link className={location.pathname==="/"?`${classes.MenuItems} ${classes.Active}`:classes.MenuItems} to="/" >Batch</Link>
                <Link className={location.pathname==="/stats"?`${classes.MenuItems} ${classes.Active}`:classes.MenuItems} to="/stats" >Stats</Link>
        </Header>
    )
}


export default HeaderComp;