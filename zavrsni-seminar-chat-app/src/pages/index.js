import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Script from "next/script";
import Messages from "@/components/Messages";
import Input from "@/components/Input";
import Members from "@/components/Members";
import TypingIndicator from "@/components/TypingIndicator";
import { useState, useEffect, useRef } from "react";

function randomName() {
  const names = [
    "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", 
    "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", 
    "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"
  ];
  const name = names[Math.floor(Math.random() * names.length)];

  return name;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
let drone = null;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const [me, setMe] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const messagesRef = useRef();
  messagesRef.current = messages;
  const membersRef = useRef();
  membersRef.current = members;
  const meRef = useRef();
  meRef.current = me;

  const channelId = "r2FjPOdzUbmpJBtC";
  function connectToScaledrone() {
    drone = new window.Scaledrone(channelId, {
      data: meRef.current,
    });


    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      meRef.current.id = drone.clientId;
      setMe(meRef.current);
    });

    const room = drone.subscribe("observable-room");

    room.on("message", (message) => {
      const { data, member } = message;
      if (typeof data === "object" && typeof data.typing === "boolean") {
        const newMembers = [...membersRef.current];
        const index = newMembers.findIndex((m) => m.id === member.id);
        newMembers[index].typing = data.typing;
        setMembers(newMembers);
      } else {
        setMessages([...messagesRef.current, message]);
      }
    });

    room.on("members", (members) => {
      setMembers(members);
    });

    room.on("member_join", (member) => {
      setMembers([...membersRef.current, member]);
    });

    room.on("member_leave", ({ id }) => {
      const index = membersRef.current.findIndex((m) => m.id === id);
      const newMembers = [...membersRef.current];
      newMembers.splice(index, 1);
      setMembers(newMembers);
    });
  }

  useEffect(() => {
    if (drone === null) {
      connectToScaledrone();
    }
  }, []);

  function onSendMessage(message) {
    drone.publish({
      room: "observable-room",
      message,
    });
  }

  function onChangeTypingState(isTyping) {
    drone.publish({
      room: "observable-room",
      message: { typing: isTyping },
    });
  }

  return (
    <>
      <Head>
        <title>Scaledrone Chat App</title>
        <meta name="description" content="Your brand-new chat app!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="text/javascript"
          src="https://cdn.scaledrone.com/scaledrone.min.js"
        />
      </Head>
      <main className={styles.app}>
        <div className={styles.appContent}>
          <Members members={members} me={me} />
          <div className={styles.mainContainer}>
            <Messages messages={messages} me={me} />
            <TypingIndicator
              members={members.filter((m) => m.typing && m.id !== me.id)}
            />

            <Input
              onSendMessage={onSendMessage}
              onChangeTypingState={onChangeTypingState}
            />
          </div>
        </div>
      </main>
    </>
  );
}
