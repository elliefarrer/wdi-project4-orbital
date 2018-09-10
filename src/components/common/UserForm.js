import React from 'react';

function UserForm(props) {
  <section>
    <form onSubmit={this.handleSubmit}>

      <div className="field">
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}/>
      </div>

      <div className="field">
        <input
          name="dateOfBirth"
          type="date"
          value={this.state.dateOfBirth}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <input
          name="postcode"
          type="text"
          placeholder="Postcode"
          value={this.state.postcode}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <input
          name="password"
          type={this.state.passwordHidden ? 'password' : 'text'}
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <p>Your password must be at least 8 characters long, and contain at least one lower case letter, upper case letter, and number.</p>
      </div>

      <div className="field">
        <input
          name="passwordConfirmation"
          type={this.state.passwordHidden ? 'password' : 'text'}
          placeholder="Confirm Password"
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="gender">Please select your gender</label>
        {this.state.genders.map((gender, index) =>
          <div key={index}>
            <input type="radio" name="gender" value={gender.value} onChange={this.handleChange}/>
            <label>{gender.label}</label>
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="sexuality">Please select who you are interested in meeting on Orbital</label>
        <input name="sexuality" type="checkbox" value="man" onChange={this.handleSexualityChange} /> Men
        <input name="sexuality" type="checkbox" value="woman" onChange={this.handleSexualityChange} /> Women
        <input name="sexuality" type="checkbox" value="transgender" onChange={this.handleSexualityChange} /> Transgender People
        <input name="sexuality" type="checkbox" value="non-binary" onChange={this.handleSexualityChange} /> Non-Binary People
        <input name="sexuality" type="checkbox" value="other" onChange={this.handleSexualityChange} /> Other
      </div>

      <div className="field">
        <input
          name="occupation"
          type="text"
          placeholder="Occupation"
          value={this.state.occupation}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <input
          name="profilePic"
          type="text"
          placeholder="Profile Picture (URL)"
          value={this.state.profilePic}
          onChange={this.handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="languages">What other languages do you speak?</label>
        <input name="languages" type="checkbox" value="Welsh" onChange={this.handleLanguageChange} /> Welsh
        <input name="languages" type="checkbox" value="French" onChange={this.handleLanguageChange} /> French
        <input name="languages" type="checkbox" value="Spanish" onChange={this.handleLanguageChange} /> Spanish
        <input name="languages" type="checkbox" value="Portuguese" onChange={this.handleLanguageChange} /> Portuguese
        <input name="languages" type="checkbox" value="Italian" onChange={this.handleLanguageChange} /> Italian
        <input name="languages" type="checkbox" value="German" onChange={this.handleLanguageChange} /> German
      </div>

      <div className="field">
        <input
          name="bio"
          type="text"
          placeholder="Bio"
          value={this.state.bio}
          onChange={this.handleChange}
        />
      </div>

      <button>Sign Up</button>

    </form>
    <button onClick={this.togglePasswordShow}>👁</button>
  </section>
}

export default UserForm;
