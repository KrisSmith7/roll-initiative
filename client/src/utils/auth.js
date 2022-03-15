import decode from 'jwt-decode';

// each method in the AuthService object has one specific role that we can call on in any component/page
class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in --> boolean
    loggedIn() {
        // check for saved and valid token
        const token = this.getToken();
        // make sure token is not undefined or expired
        return !!token && !this.isTokenExpired(token);
    }

    // check to see if token is expired
    isTokenExpired(token) {
        try {
            const decode = decode(token);
            if (decode.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }
    // accept tokenn, set token to localStorage, and refresh to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    // clear token from localStorage and force logout with reload
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();

