import React from 'react'

function Register(){
    return(
        <div className= 'register'>
            <h1>Register</h1>
            <form action="" method="POST">
                {% csrf_token %}
                {{ form.as_p }}

                <button type="submit">Register</button>
            </form>
            <p class="text-center">If you already have an account, <a href="/login">login</a> instead.</p>
        </div>
    )
}

export default Register