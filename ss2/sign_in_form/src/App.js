import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="container" style={{ maxWidth: '330px', marginTop: '50px' }}>
        {/* Logo Bootstrap (hoặc logo tuỳ chỉnh) */}
        <div className="text-center">
          <img
              className="mb-4"
              src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt="Bootstrap Logo"
              width="72"
              height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        </div>

        <form>
          <div className="form-floating mb-3">
            <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>

        <p className="mt-5 mb-3 text-muted text-center">© 2017–2021</p>
      </div>
  );
}

export default App;
