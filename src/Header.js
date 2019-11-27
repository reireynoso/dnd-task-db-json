import React, { Component,Fragment } from 'react'

export default class Header extends Component {

    render() {
        return (
        <div>
            <div className="ui secondary menu">
                <a class="active item">
                    Home
                </a>

                <a class="item">
                    Messages
                </a>

                <a class="item">
                    Friends
                </a>

                <div class="right menu">
                    <div class="item">
                        <div class="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i class="search link icon"></i>
                        </div>
                    </div>
                </div>

                {
                this.props.currentUser ? 
                    <a class="ui item" onClick={() => {this.props.handleLogOut()}}>
                        Logout {this.props.currentUser}
                    </a>
                    :
                    
                    <Fragment>
                        <a class="ui item">
                            Sign Up
                        </a>

                        <a class="ui item">
                            Login
                        </a>
                    </Fragment>
                   
                }
            </div>
        </div>
        )
    }
}
