import './App.css';
import UpdateStudent from "./component/student/UpdateStudent";
import Counter from "./component/student/Counter";
import Selector from "./component/student/Selector";
function App() {
  return (
      <div className="App">
        <UpdateStudent/>
          <Counter/>
          <Selector/>
      </div>
  );
}
export default App;