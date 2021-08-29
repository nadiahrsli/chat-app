const { useState, useEffect } = require("react");
const SignUp = require("./signup");
const Chat = require("./chat");
const supabase = require("../utils/supabase");

function App() {
  const [session, setSession] = useState(null); // session - is there any login user
  useEffect(function () {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange(function (event, supaSession) {
      setSession(supaSession);
    });
  }, []);
  console.log(session);

  let markup = <SignUp />; // By default, we will assume they are logged out
  if (session) {
    // If they are logged in (meaning there is a session)
    let email = session.user.email;
    markup = (
      <div>
        <h2>You are logged in as {email}</h2>
        <Chat />
      </div>
    );
  }

  return (
    <div>
      <h2>Supabase + React Chat App</h2>
      {markup}
    </div>
  );
}

module.exports = App;
