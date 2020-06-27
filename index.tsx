import { h, render } from "preact";
import { useState } from "preact/hooks";

import styles from "./style.scss";

function App() {
  const [state, setState] = useState(0);
  return (
    <div className={styles.container}>
      <button onClick={() => setState((n) => n + 1)}>カウントアップ</button>
      <p>Count : {String(state)}</p>
    </div>
  );
}

render(<App />, document.getElementById("app") as Element);
