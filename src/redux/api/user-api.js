//Get all Users stored
export const getAllUsers = async () => {
    try {
        let token = localStorage.getItem("token");


        const response = await fetch("/api/v2/users/", {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const user = await response.json();

        user.users.map(u => {
            return u.active = String(u.active);
        })


        return user.users;
    }
    catch (err) {
        console.log(err);
    }
}

//Get all Users stored
export const getUserById = async (uid) => {
    try {
        let token = localStorage.getItem("token");

        const response = await fetch(`/api/v2/users/${uid}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const user = await response.json();
        return user.users;
    }
    catch (err) {
        console.log(err);
    }
}

//Delete User By ID
export const deleteUserById = async (id) => {
    try {
        let token = localStorage.getItem("token");
        const response = await fetch(`/api/v2/users/${id}`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const r = await response.json();
        return r;
    }
    catch (err) {
        console.log(err);
    }

}



//Create New User
export const createNewUser = async (values) => {
    let token = localStorage.getItem("token");

    try {
        const response = await fetch("/api/v2/users", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },

            body: JSON.stringify({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                jobs_count: values.jobs_count,
                active: values.active,
                slack_username: values.slack_username
            })
        })

        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const r = await response.json();
        return r;

    }

    catch (err) {
        console.log(err);
    }

}

//Create New User
export const updateExistingUser = async (values) => {
    let token = localStorage.getItem("token");
    let id = values.id;

    try {
        const response = await fetch(`/api/v2/users/${id}`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },

            body: JSON.stringify({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                jobs_count: values.jobs_count,
                active: values.active,
                slack_username: values.slack_username
            })
        })
        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const r = await response.json();
        return r.users;

    }

    catch (err) {
        console.log(err);
    }

}

//Logout
export const logoutUser = async (values) => {
    let token = localStorage.getItem("token");

    try {
        const response = await fetch(`/api/v2/users/tokens`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (!response.ok) {
            const errmsg = `An error occured: ${response.status}`;
            throw new Error(errmsg);
        }

        const r = await response.json();
        return r;

    }

    catch (err) {
        console.log(err);
    }

}