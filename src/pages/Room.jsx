import { useState, useEffect } from "react";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash2 } from "react-feather";
import Header from "../components/Header";
import client, {
  databases,
  DATABASES_ID,
  PROJECT_ID,
  COLLECTION_ID_MESSAGES,
} from "../../appwriteConfig";
import { useAuth } from "../utils/AuthContext";
const Room = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(
      `databases.${DATABASES_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        console.log("Real time work ", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A message was created");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A message was delete");
          setMessages((prev) =>
            prev.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [Permission.write(Role.user(user.$id))];

    let response = await databases.createDocument(
      DATABASES_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    console.log("Created", response);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    setMessages(response.documents);
  };

  const deleteMessages = async (messageId) => {
    databases.deleteDocument(DATABASES_ID, COLLECTION_ID_MESSAGES, messageId);
  };

  return (
    <>
      <main className="container">
        <Header />
        <div className="room--container">
          <form onSubmit={handleSubmit}>
            <div>
              <textarea
                required
                maxLength={"1000"}
                placeholder="Say something"
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
                value={messageBody}
              ></textarea>
            </div>
            <div className="send-btn--wrapper">
              <input
                type="submit"
                value={"Send"}
                className="btn btn--secondary"
              />
            </div>
          </form>
          <div className="message--container">
            {messages.map((message) => {
              return (
                <div key={message.$id} className="message--wrappper">
                  <div className="message--header">
                    <p>
                      {message?.username ? (
                        <span>{message.username}</span>
                      ) : (
                        <span>Anonymous user</span>
                      )}
                      <small className="message-timestamp">
                        {new Date(message.$createdAt).toLocaleString()}
                      </small>
                    </p>

                    {message.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    ) && (
                      <Trash2
                        className="delete--btn"
                        onClick={() => deleteMessages(message.$id)}
                      />
                    )}
                  </div>

                  <div className="message--body">
                    <span>{message.body}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Room;
