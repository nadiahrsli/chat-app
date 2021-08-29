const { useEffect, useState } = require("react");
const supabase = require("../utils/supabase");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  let messageMarkup = messages.map(function (message) {
    return (
      <div>
        <p>{message.content}</p>
        <p>Written by {message.email}</p>
      </div>
    );
  });

  function getAllMessages() {
    // Load all of the messages in the database
    supabase
      .from("messages")
      .select("*") //all field/column
      .order("id", { ascending: false }) //automatically increase
      .then(function (data) {
        setMessages(data.body);
        // Select every data from the messages
      });
  }

  useEffect(function () {
    getAllMessages();
    setInterval(function () {
      getAllMessages();
    }, 1000); // get all messages every 1sec
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    // Save the message to the database
    supabase
      .from("messages")
      .insert({ content: content, email: "temporary" })
      .then(function (data) {
        console.log(data);
      });
    console.log("The form was submitted");
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your message"
          value={content}
          onChange={handleChange}
        />
        <input type="submit" value="Send" />
      </form>
      <h3>All messages!</h3>
      {messageMarkup}
    </div>
  );
}

module.exports = Chat;
