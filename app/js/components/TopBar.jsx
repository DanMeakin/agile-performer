import React, { Component } from 'react';

class TopBar extends Component {
    render (){
        return (
            <div className="fixed sticky"> 
                <nav className="top-bar" data-topbar>   
                    Agile Performer
                </nav>
            </div>
        )
    }
}

export default TopBar;