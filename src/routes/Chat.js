import React, { useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import style from "../CSS/style.css";
const Chat = () => {
  const [myChat, setMyChat] = useState(""); // 내가 작성한 채팅 텍스트
  const [aiAnswer, setAiAnswer] = useState(""); // 답변 텍스트
  const [allChats, setAllChats] = useState([]); // 모든 채팅 저장 배열
  const chatBoxRef = useRef(null);
  //openAi 정의하는 부분...
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  //input text 연동
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setMyChat(value);
  };
  //사용자가 쓴 채팅 submit
  const onSubmit = async (e) => {
    e.preventDefault(); //새로고침 방지
    if (myChat === "") return; // chat가 공백이면 리턴한다.
    setAllChats((prev) => [...prev, { isUser: true, text: myChat }]); //배열에 사용자chatObj를 넣는다.
    setMyChat(""); //submit후에 chat를 초기화한다.
    //openai 답변 요청 (nodejs에서 해야되는데 일단...)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${myChat}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    //답변 채팅 텍스트 받아오기
    setAiAnswer(response.data.choices[0].text);
    //요청 후 답변을 배열에 저장
    setAllChats((prev) => [
      ...prev,
      { isUser: false, text: response.data.choices[0].text },
    ]);
  };

  //새로운 채팅(mine)이 생겨나면 스크롤을 맨 아래로 내리는 함수..
  useEffect(() => {
    const scrollBox = chatBoxRef.current;
    scrollBox.scrollTop = scrollBox.scrollHeight;
  }, [myChat]);
  //새로운 채팅(answer)이 생겨나면 스크롤을 맨 아래로 내리는 함수..
  useEffect(() => {
    const scrollBox = chatBoxRef.current;
    scrollBox.scrollTop = scrollBox.scrollHeight;
  }, [aiAnswer]);

  return (
    <>
      <div ref={chatBoxRef} className="chat-box">
        {allChats.map((allchat, index) => (
          <div key={index} className="chat-box-box">
            {allchat.isUser ? (
              <span className="chat-span mine">{allchat.text}</span>
            ) : (
              <span className="chat-span">{allchat.text}</span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={myChat} type="text" />
        <input type="submit" />
      </form>
    </>
  );
};

export default Chat;
