import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class SignupForm extends React.Component {
	// state = {
	// 	username: "",
    //     password: "",
	// 	bio: "",
		
	// }

	state = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		bio: "",
		img_url: ""
		}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	createUser = () => {
		fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            user: {
                first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				password: this.state.password,
				bio: this.state.bio,
				img_url: this.state.img_url
            }
        })
        })
        .then(r => r.json())
        .then(data => 
            {
                // this.props.handleLogin(data.user)
				localStorage.setItem("token", data.token)
				// console.log(data)
            }
            // console.log(data.jwt)
        )
	}

	handleSubmit = (e) => {
        e.preventDefault()
        this.createUser()
        // e.target.reset()

	}

	render(){
		return (
            <div className="container form">
			<Form onSubmit={this.handleSubmit}>
			<Form.Field>
		      <label>first</label>
		      <input onChange={this.handleChange} name="first_name" value={this.state.first_name} placeholder='Bio' required/>
		    </Form.Field>
			<Form.Field>
		      <label>last</label>
		      <input onChange={this.handleChange} name="last_name" value={this.state.last_name} placeholder='Bio' required/>
		    </Form.Field>
		    <Form.Field>
		      <label>email</label>
		      <input onChange={this.handleChange} name="email" value={this.state.email} placeholder='Username' required />
		    </Form.Field>
			<Form.Field>
		      <label>img</label>
		      <input onChange={this.handleChange} name="img_url" value={this.state.img_url} placeholder='Username' required />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' required/>
		    </Form.Field>
		    <Form.Field>
		      <label>Bio</label>
		      <input onChange={this.handleChange} name="bio" value={this.state.bio} placeholder='Bio' required/>
		    </Form.Field>
		    <Button type='submit'>Sign Up</Button>
		  </Form>
          </div>
		)
	}
}

export default SignupForm